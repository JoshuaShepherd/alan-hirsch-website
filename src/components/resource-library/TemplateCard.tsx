'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Download, Eye, FileText, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Template } from '@/types/resource-library';

interface TemplateCardProps {
  template: Template;
  variant?: 'default' | 'featured';
}

const TemplateCard: React.FC<TemplateCardProps> = ({ 
  template, 
  variant = 'default' 
}) => {
  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'docx': return '📄';
      case 'pdf': return '📄';
      case 'pptx': return '📊';
      case 'xlsx': return '📈';
      case 'google-doc': return '📝';
      case 'notion': return '📓';
      default: return '📄';
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'docx': return 'bg-blue-100 text-blue-800';
      case 'pdf': return 'bg-red-100 text-red-800';
      case 'pptx': return 'bg-orange-100 text-orange-800';
      case 'xlsx': return 'bg-green-100 text-green-800';
      case 'google-doc': return 'bg-indigo-100 text-indigo-800';
      case 'notion': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'church-planting': return '🌱';
      case 'vision-casting': return '🎯';
      case 'small-groups': return '👥';
      case 'evangelism': return '💬';
      case 'discipleship': return '📖';
      case 'leadership': return '🎯';
      case 'assessment': return '📋';
      default: return '📄';
    }
  };

  const handleDownload = () => {
    window.open(template.downloadUrl, '_blank');
  };

  const handlePreview = () => {
    if (template.previewUrl) {
      window.open(template.previewUrl, '_blank');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`h-full ${variant === 'featured' ? 'border-indigo-200 shadow-lg' : ''}`}>
        {template.thumbnailUrl && (
          <div className="relative">
            <img
              src={template.thumbnailUrl}
              alt={template.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            {variant === 'featured' && (
              <Badge className="absolute top-2 right-2 bg-indigo-600">
                Featured
              </Badge>
            )}
            <div className="absolute top-2 left-2">
              <Badge className={getFormatColor(template.format)}>
                <span className="mr-1">{getFormatIcon(template.format)}</span>
                {template.format.toUpperCase()}
              </Badge>
            </div>
            <div className="absolute bottom-2 left-2">
              <Badge variant="secondary" className="bg-white/90">
                <span className="mr-1">{getCategoryIcon(template.category)}</span>
                {template.category.replace('-', ' ')}
              </Badge>
            </div>
          </div>
        )}
        
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-ink leading-tight">
                {template.title}
              </CardTitle>
              <CardDescription className="text-sm text-graphite mt-1">
                {template.description}
              </CardDescription>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">{template.rating.toFixed(1)}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Use Case */}
          <div className="mb-4">
            <p className="text-xs font-medium text-graphite mb-1">Best For:</p>
            <p className="text-sm text-ink">{template.useCase}</p>
          </div>

          {/* Subcategory and Type */}
          <div className="flex flex-wrap gap-2 mb-4">
            {template.subcategory && (
              <Badge variant="outline" className="text-xs">
                {template.subcategory}
              </Badge>
            )}
            <Badge variant="outline" className="text-xs capitalize">
              {template.type}
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              {template.downloadCount.toLocaleString()}
            </Badge>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {template.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {template.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{template.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Customization Notes Preview */}
          {template.customizationNotes.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs font-medium text-blue-800 mb-1">💡 Customization Tip:</p>
              <p className="text-xs text-blue-700">
                {template.customizationNotes[0]}
                {template.customizationNotes.length > 1 && ' + more tips included'}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            {template.previewUrl && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePreview}
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            )}
            <Button 
              onClick={handleDownload}
              size="sm"
              className={`${template.previewUrl ? 'flex-1' : 'w-full'}`}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          {/* Instructions Preview */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-medium text-graphite mb-1">Instructions:</p>
            <p className="text-xs text-graphite line-clamp-2">
              {template.instructions}
            </p>
          </div>

          {/* Testimonial */}
          {template.testimonials && template.testimonials.length > 0 && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-graphite italic mb-1">
                "{template.testimonials[0].quote}"
              </p>
              <p className="text-xs font-medium text-ink">
                — {template.testimonials[0].name}
                {template.testimonials[0].role && (
                  <span className="text-graphite font-normal">
                    , {template.testimonials[0].role}
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

export default TemplateCard;
