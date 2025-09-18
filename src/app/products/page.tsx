'use client';

import { useState } from 'react';
import { Product, ServiceProduct } from '@/lib/products-data';
import { useCart } from '@/components/products/ShoppingCart';
import ProductCatalog from '@/components/products/ProductCatalog';
import { ProductDetail } from '@/components/products/ProductDetail';
import { ServiceBooking, BookingFormData } from '@/components/products/ServiceBooking';

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceProduct | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  
  const { addToCart } = useCart();

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    addToCart(product, quantity);
  };

  const handleAddToWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleServiceBooking = (service: ServiceProduct) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleBookingSubmit = (bookingData: BookingFormData) => {
    console.log('Booking submitted:', bookingData);
    // Here you would typically send the booking data to your backend
    alert('Booking request submitted successfully!');
    setIsBookingOpen(false);
    setSelectedService(null);
  };

  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-background">
        <ProductDetail
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onBookService={selectedProduct.type === 'service' ? handleServiceBooking : undefined}
        />
        
        {/* Back to catalog button */}
        <div className="fixed top-6 left-6 z-50">
          <button
            onClick={() => setSelectedProduct(null)}
            className="bg-background border rounded-lg px-4 py-2 shadow-md hover:shadow-lg transition-shadow"
          >
            ← Back to Products
          </button>
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
  }

  return (
    <div className="min-h-screen bg-background">
      <ProductCatalog />
    </div>
  );
}
