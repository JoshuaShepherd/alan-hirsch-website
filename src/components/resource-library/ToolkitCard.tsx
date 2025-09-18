'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Users, Package, ChevronRight, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Toolkit } from '@/types/resource-library';

interface ToolkitCardProps {
  toolkit: Toolkit;
  variant?: 'default' | 'featured';
}

const ToolkitCard: React.FC<ToolkitCardProps> = ({ 
  toolkit, 
  variant = 'default' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'church-planting': return '🌱';
      case 'leadership': return '👥';
      case 'discipleship': return '📖';
      case 'evangelism': return '💬';
      case 'community-building': return '🤝';
      case 'assessment': return '📋';
      default: return '📦';
    }
  };

  const handleDownload = () => {
    if (toolkit.isPremium) {
      // Redirect to purchase page or show premium modal
      console.log('Redirecting to premium purchase for:', toolkit.id);
    } else {
      // Direct download
      window.open(toolkit.downloadUrl, '_blank');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`h-full ${variant === 'featured' ? 'border-indigo-200 shadow-lg' : ''}`}>
        {toolkit.thumbnailUrl && (
          <div className="relative">
            <img
              src={toolkit.thumbnailUrl}
              alt={toolkit.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            {variant === 'featured' && (
              <Badge className="absolute top-2 right-2 bg-indigo-600">
                Featured
              </Badge>
            )}
            {toolkit.isPremium && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-amber-500 text-white">
                  Premium
                </Badge>
              </div>
            )}
            <div className="absolute bottom-2 left-2">
              <Badge variant="secondary" className="bg-white/90">
                <span className="mr-1">{getCategoryIcon(toolkit.category)}</span>
                {toolkit.contents.length} Resources
              </Badge>
            </div>
          </div>
        )}
        
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-ink leading-tight">
                {toolkit.title}
              </CardTitle>
              {toolkit.subtitle && (
                <p className="text-sm text-indigo-600 font-medium mt-1">
                  {toolkit.subtitle}
                </p>
              )}
              <CardDescription className="text-sm text-graphite mt-1">
                {isExpanded ? toolkit.longDescription : toolkit.description}
              </CardDescription>
              {toolkit.longDescription !== toolkit.description && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-xs text-indigo-600 hover:text-indigo-700 mt-1 flex items-center gap-1"
                >
                  {isExpanded ? 'Show less' : 'Show more'}
                  <ChevronRight className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">{toolkit.rating.toFixed(1)}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Metadata */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className={getDifficultyColor(toolkit.difficulty)}>
              {toolkit.difficulty}
            </Badge>
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              {toolkit.estimatedTime}
            </Badge>
            <Badge variant="outline">
              <Users className="h-3 w-3 mr-1" />
              {toolkit.downloadCount.toLocaleString()}
            </Badge>
          </div>

          {/* Target Audience */}
          <div className="mb-4">
            <p className="text-xs font-medium text-graphite mb-1">Target Audience:</p>
            <div className="flex flex-wrap gap-1">
              {toolkit.targetAudience.slice(0, 3).map((audience) => (
                <Badge key={audience} variant="outline" className="text-xs">
                  {audience}
                </Badge>
              ))}
              {toolkit.targetAudience.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{toolkit.targetAudience.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Contents Preview */}
          <div className="mb-4">
            <p className="text-xs font-medium text-graphite mb-2">What's Included:</p>
            <div className="space-y-1">
              {toolkit.contents.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                  <span className="text-graphite">{item.title}</span>
                  <Badge variant="outline" className="text-xs ml-auto">
                    {item.type}
                  </Badge>
                </div>
              ))}
              {toolkit.contents.length > 3 && (
                <div className="text-xs text-graphite italic">
                  And {toolkit.contents.length - 3} more resources...
                </div>
              )}
            </div>
          </div>

          {/* Price and Download */}
          <div className="flex items-center justify-between mb-4">
            <div>
              {toolkit.isPremium ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-ink">${toolkit.price}</span>
                  {toolkit.originalPrice && (
                    <span className="text-sm text-graphite line-through">
                      ${toolkit.originalPrice}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-lg font-bold text-green-600">Free</span>
              )}
            </div>
            <Button 
              onClick={handleDownload}
              size="sm"
              className={toolkit.isPremium ? '' : 'bg-green-600 hover:bg-green-700'}
            >
              <Package className="h-4 w-4 mr-2" />
              {toolkit.isPremium ? 'Purchase' : 'Download'}
            </Button>
          </div>

          {/* Testimonial */}
          {toolkit.testimonials && toolkit.testimonials.length > 0 && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-graphite italic mb-1">
                "{toolkit.testimonials[0].quote}"
              </p>
              <p className="text-xs font-medium text-ink">
                — {toolkit.testimonials[0].name}
                {toolkit.testimonials[0].role && (
                  <span className="text-graphite font-normal">
                    , {toolkit.testimonials[0].role}
                  </span>
                )}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ToolkitCard;
