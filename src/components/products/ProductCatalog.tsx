'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search,
  Filter,
  ShoppingCart,
  Star,
  Download,
  Calendar,
  Users,
  Package,
  Book,
  Headphones,
  Video,
  FileText,
  Briefcase,
  MessageCircle,
  Mic,
  GraduationCap,
  X,
  ChevronDown,
  Heart,
  Share2,
  ArrowRight
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCartComponent } from './ShoppingCart';
import { ServiceBooking, BookingFormData } from './ServiceBooking';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { 
  getAllProducts, 
  getProductsByType, 
  getFeaturedProducts, 
  searchProducts,
  getProductsByCategory,
  productBundles,
  Product,
  DigitalProduct,
  PhysicalProduct,
  ServiceProduct
} from '@/lib/products-data';

type ProductType = 'all' | 'digital' | 'physical' | 'service';

const ProductCatalog: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProductType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceProduct | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const getProductIcon = (product: Product) => {
    if (product.type === 'digital') {
      const digitalProduct = product as DigitalProduct;
      switch (digitalProduct.productType) {
        case 'course': return <GraduationCap className="h-5 w-5" />;
        case 'guide': return <FileText className="h-5 w-5" />;
        case 'template': return <FileText className="h-5 w-5" />;
        case 'ebook': return <Book className="h-5 w-5" />;
        case 'audio': return <Headphones className="h-5 w-5" />;
        case 'video': return <Video className="h-5 w-5" />;
        default: return <Download className="h-5 w-5" />;
      }
    } else if (product.type === 'physical') {
      const physicalProduct = product as PhysicalProduct;
      switch (physicalProduct.productType) {
        case 'book': return <Book className="h-5 w-5" />;
        case 'merchandise': return <Package className="h-5 w-5" />;
        case 'materials': return <Package className="h-5 w-5" />;
        default: return <Package className="h-5 w-5" />;
      }
    } else {
      const serviceProduct = product as ServiceProduct;
      switch (serviceProduct.productType) {
        case 'coaching': return <MessageCircle className="h-5 w-5" />;
        case 'consulting': return <Briefcase className="h-5 w-5" />;
        case 'speaking': return <Mic className="h-5 w-5" />;
        case 'workshop': return <Users className="h-5 w-5" />;
        default: return <Calendar className="h-5 w-5" />;
      }
    }
  };

  const getProductTypeLabel = (product: Product): string => {
    if (product.type === 'digital') {
      const digitalProduct = product as DigitalProduct;
      return digitalProduct.productType.charAt(0).toUpperCase() + digitalProduct.productType.slice(1);
    } else if (product.type === 'physical') {
      const physicalProduct = product as PhysicalProduct;
      return physicalProduct.productType.charAt(0).toUpperCase() + physicalProduct.productType.slice(1);
    } else {
      const serviceProduct = product as ServiceProduct;
      return serviceProduct.productType.charAt(0).toUpperCase() + serviceProduct.productType.slice(1);
    }
  };

  const filteredProducts = useMemo(() => {
    let products = activeTab === 'all' ? getAllProducts() : getProductsByType(activeTab);
    
    // Filter by search term
    if (searchTerm) {
      products = searchProducts(searchTerm).filter(p => 
        activeTab === 'all' || p.type === activeTab
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      products = products.filter(product => product.category === selectedCategory);
    }
    
    // Sort products
    switch (sortBy) {
      case 'featured':
        products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'name':
        products.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    
    return products;
  }, [activeTab, searchTerm, selectedCategory, sortBy]);

  const featuredProducts = getFeaturedProducts();
  const categories = Array.from(new Set(getAllProducts().map(product => product.category)));

  const addToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleServiceBooking = (service: ServiceProduct) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleBookingSubmit = (bookingData: BookingFormData) => {
    console.log('Booking submitted:', bookingData);
    // Here you would typically send the booking data to your backend
    alert('Booking request submitted successfully!');
  };

  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-paper">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-display-xl font-display text-ink mb-4">
              Product Catalog
            </h1>
            <p className="text-xl text-graphite max-w-3xl mx-auto">
              Discover our complete collection of courses, books, templates, and services 
              designed to equip you for missional leadership and organizational transformation.
            </p>
          </div>

          {/* Featured Products Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 3).map((product: Product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full overflow-hidden group cursor-pointer">
                    <div className="relative">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-indigo-600 text-white">
                          Featured
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-white/90 hover:bg-white"
                          onClick={() => toggleWishlist(product.id)}
                        >
                          <Heart 
                            className={`h-4 w-4 ${
                              wishlist.includes(product.id) 
                                ? 'text-red-500 fill-current' 
                                : 'text-graphite'
                            }`} 
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-white/90 hover:bg-white"
                        >
                          <Share2 className="h-4 w-4 text-graphite" />
                        </Button>
                      </div>
                    </div>

                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getProductIcon(product)}
                          <Badge variant="outline" className="text-xs">
                            {getProductTypeLabel(product)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-500 fill-current" />
                          <span className="text-sm font-medium">4.9</span>
                        </div>
                      </div>

                      <CardTitle className="text-lg leading-tight">
                        {product.title}
                      </CardTitle>
                      
                      <CardDescription className="text-sm">
                        {product.shortDescription}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-ink">
                            {formatPrice(product.price, product.currency)}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-sm text-graphite line-through">
                              {formatPrice(product.originalPrice, product.currency)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {product.type === 'service' ? (
                          <Button
                            onClick={() => handleServiceBooking(product as ServiceProduct)}
                            className="flex-1"
                            size="sm"
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Service
                          </Button>
                        ) : (
                          <Button
                            onClick={() => addToCart(product.id)}
                            className="flex-1"
                            size="sm"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-graphite h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured First</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>

                <Sheet open={showFilters} onOpenChange={setShowFilters}>
                  <SheetTrigger asChild>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filter Products</SheetTitle>
                      <SheetDescription>
                        Refine your search with these filters
                      </SheetDescription>
                    </SheetHeader>
                    {/* Additional filter options can be added here */}
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ProductType)}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="digital">Digital</TabsTrigger>
              <TabsTrigger value="physical">Physical</TabsTrigger>
              <TabsTrigger value="service">Services</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-8">
              {/* Results Count */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-graphite">
                  Showing {filteredProducts.length} products
                </p>
                {cart.length > 0 && (
                  <Button variant="outline" className="relative">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Cart ({cart.length})
                  </Button>
                )}
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                  {filteredProducts.map((product: Product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -2 }}
                    >
                      <Card className="h-full overflow-hidden group cursor-pointer">
                        <div className="relative">
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.featured && (
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-indigo-600 text-white text-xs">
                                Featured
                              </Badge>
                            </div>
                          )}
                          <div className="absolute top-2 right-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="bg-white/90 hover:bg-white"
                              onClick={() => toggleWishlist(product.id)}
                            >
                              <Heart 
                                className={`h-3 w-3 ${
                                  wishlist.includes(product.id) 
                                    ? 'text-red-500 fill-current' 
                                    : 'text-graphite'
                                }`} 
                              />
                            </Button>
                          </div>
                        </div>

                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getProductIcon(product)}
                              <Badge variant="outline" className="text-xs">
                                {getProductTypeLabel(product)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-amber-500 fill-current" />
                              <span className="text-xs font-medium">4.9</span>
                            </div>
                          </div>

                          <CardTitle className="text-base leading-tight">
                            {product.title}
                          </CardTitle>
                          
                          <CardDescription className="text-xs">
                            {product.shortDescription}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-ink">
                                {formatPrice(product.price, product.currency)}
                              </span>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-xs text-graphite line-through">
                                  {formatPrice(product.originalPrice, product.currency)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Product-specific details */}
                          {product.type === 'digital' && (
                            <div className="text-xs text-graphite mb-3">
                              <div className="flex items-center gap-2">
                                <Download className="h-3 w-3" />
                                <span>Instant Download</span>
                              </div>
                            </div>
                          )}

                          {product.type === 'physical' && (
                            <div className="text-xs text-graphite mb-3">
                              <div className="flex items-center gap-2">
                                <Package className="h-3 w-3" />
                                <span>Free Shipping</span>
                              </div>
                            </div>
                          )}

                          {product.type === 'service' && (
                            <div className="text-xs text-graphite mb-3">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                <span>{(product as ServiceProduct).duration} min session</span>
                              </div>
                            </div>
                          )}

                          {product.type === 'service' ? (
                            <Button
                              onClick={() => handleServiceBooking(product as ServiceProduct)}
                              className="w-full"
                              size="sm"
                            >
                              <Calendar className="h-4 w-4 mr-2" />
                              Book Service
                            </Button>
                          ) : (
                            <Button
                              onClick={() => addToCart(product.id)}
                              className="w-full"
                              size="sm"
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-ink mb-2">No products found</h3>
                  <p className="text-graphite">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setActiveTab('all');
                    }}
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Product Bundles */}
          {productBundles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-ink mb-6">Product Bundles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {productBundles.filter(bundle => bundle.status === 'active').map((bundle) => (
                  <Card key={bundle.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={bundle.imageUrl}
                        alt={bundle.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-600 text-white">
                          Save ${bundle.savings}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl">{bundle.title}</CardTitle>
                      <CardDescription>{bundle.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-ink">
                            ${bundle.bundlePrice}
                          </span>
                          <span className="text-sm text-graphite">
                            (Save ${bundle.savings})
                          </span>
                        </div>
                      </div>

                      <Button className="w-full">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add Bundle to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Shopping Cart */}
      <div className="fixed bottom-6 right-6 z-50">
        <ShoppingCartComponent />
      </div>

      {/* Service Booking Modal */}
      {selectedService && (
        <ServiceBooking
          service={selectedService}
          isOpen={isBookingOpen}
          onClose={() => {
            setIsBookingOpen(false);
            setSelectedService(null);
          }}
          onBookingSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
};

export default ProductCatalog;
