'use client';

import { useState } from 'react';
import { Product, DigitalProduct, PhysicalProduct, ServiceProduct } from '@/lib/products-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  Clock, 
  Users, 
  Download, 
  BookOpen,
  ShoppingCart,
  Heart,
  Share2,
  Calendar,
  MapPin,
  Video,
  FileText,
  Award
} from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
  onAddToWishlist: (product: Product) => void;
  onBookService?: (product: ServiceProduct) => void;
}

export function ProductDetail({ 
  product, 
  onAddToCart, 
  onAddToWishlist, 
  onBookService 
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);

  const isDigital = product.type === 'digital';
  const isPhysical = product.type === 'physical';
  const isService = product.type === 'service';

  const digitalProduct = isDigital ? product as DigitalProduct : null;
  const physicalProduct = isPhysical ? product as PhysicalProduct : null;
  const serviceProduct = isService ? product as ServiceProduct : null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const handleBookService = () => {
    if (serviceProduct && onBookService) {
      onBookService(serviceProduct);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: product.currency,
    }).format(price);
  };

  const renderProductSpecifics = () => {
    if (digitalProduct) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {digitalProduct.productType === 'course' && digitalProduct.modules && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{digitalProduct.modules.length}</div>
                <div className="text-sm text-muted-foreground">Modules</div>
              </div>
            )}
            {digitalProduct.productType === 'course' && digitalProduct.modules && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {digitalProduct.modules.reduce((total, module) => total + module.lessons.length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Lessons</div>
              </div>
            )}
            <div className="text-center">
              <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="font-medium">{digitalProduct.duration}</div>
            </div>
            <div className="text-center">
              <Download className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-sm text-muted-foreground">Access</div>
              <div className="font-medium">Lifetime</div>
            </div>
          </div>

          {digitalProduct.modules && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Course Modules</h3>
                <div className="space-y-3">
                  {digitalProduct.modules.map((module, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{module.title}</h4>
                        <p className="text-sm text-muted-foreground">{module.description}</p>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {module.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      );
    }

    if (physicalProduct) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-sm text-muted-foreground">Format</div>
              <div className="font-medium capitalize">{physicalProduct.productType}</div>
            </div>
            {physicalProduct.isbn && (
              <div className="text-center">
                <div className="text-sm text-muted-foreground">ISBN</div>
                <div className="font-medium">{physicalProduct.isbn}</div>
              </div>
            )}
            {physicalProduct.pages && (
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Pages</div>
                <div className="font-medium">{physicalProduct.pages}</div>
              </div>
            )}
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Stock</div>
              <div className="font-medium">
                {physicalProduct.inventory > 0 ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>
          </div>

          {physicalProduct.dimensions && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Dimensions:</span>
                    <span className="ml-2">
                      {physicalProduct.dimensions.length}" × {physicalProduct.dimensions.width}" × {physicalProduct.dimensions.height}"
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="ml-2">{physicalProduct.weight} lbs</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      );
    }

    if (serviceProduct) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="font-medium">{serviceProduct.duration}</div>
            </div>
            <div className="text-center">
              <Video className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-sm text-muted-foreground">Delivery</div>
              <div className="font-medium capitalize">{serviceProduct.deliveryMethod}</div>
            </div>
            {serviceProduct.maxParticipants && (
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm text-muted-foreground">Max Size</div>
                <div className="font-medium">{serviceProduct.maxParticipants}</div>
              </div>
            )}
            <div className="text-center">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-sm text-muted-foreground">Booking</div>
              <div className="font-medium">Available</div>
            </div>
          </div>

          {serviceProduct.includes && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">What's Included</h3>
                <ul className="space-y-2">
                  {serviceProduct.includes.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Image/Media */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-center">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Product Image</p>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant="outline" className="capitalize">{product.type}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{product.description}</p>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-primary mb-6">
              {formatPrice(product.price)}
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4">
            {isPhysical && (
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              {isService ? (
                <Button 
                  onClick={handleBookService}
                  className="flex-1"
                  size="lg"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Service
                </Button>
              ) : (
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1"
                  size="lg"
                  disabled={isPhysical && physicalProduct?.inventory === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onAddToWishlist(product)}
              >
                <Heart className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="lg">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-8">
            {renderProductSpecifics()}
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                <p className="text-muted-foreground">Reviews coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="related" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Related Products</h3>
                <p className="text-muted-foreground">Related products coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
