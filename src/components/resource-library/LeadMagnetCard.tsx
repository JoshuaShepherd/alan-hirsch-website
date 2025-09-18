'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Star, Clock, Users, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LeadMagnet } from '@/types/resource-library';
import EmailCaptureModal from '@/components/resource-library/EmailCaptureModal';

interface LeadMagnetCardProps {
  leadMagnet: LeadMagnet;
  variant?: 'default' | 'featured';
}

const LeadMagnetCard: React.FC<LeadMagnetCardProps> = ({ 
  leadMagnet, 
  variant = 'default' 
}) => {
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  const handleDownload = () => {
    if (leadMagnet.gated) {
      setShowEmailCapture(true);
    } else {
      // Direct download logic
      window.open(leadMagnet.downloadUrl, '_blank');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <Card className={`h-full ${variant === 'featured' ? 'border-indigo-200 shadow-lg' : ''}`}>
          {leadMagnet.thumbnailUrl && (
            <div className="relative">
              <img
                src={leadMagnet.thumbnailUrl}
                alt={leadMagnet.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {variant === 'featured' && (
                <Badge className="absolute top-2 right-2 bg-indigo-600">
                  Featured
                </Badge>
              )}
              {leadMagnet.gated && (
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Mail className="h-3 w-3 mr-1" />
                    Free
                  </Badge>
                </div>
              )}
            </div>
          )}
          
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold text-ink leading-tight">
                  {leadMagnet.title}
                </CardTitle>
                <CardDescription className="text-sm text-graphite mt-1">
                  {leadMagnet.description}
                </CardDescription>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">{leadMagnet.rating.toFixed(1)}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {leadMagnet.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {leadMagnet.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{leadMagnet.tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between text-sm text-graphite mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{leadMagnet.estimatedReadTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{leadMagnet.downloadCount.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-xs">
                {leadMagnet.fileFormat.toUpperCase()} • {formatFileSize(leadMagnet.fileSize)}
              </div>
            </div>

            {/* Download Button */}
            <Button 
              onClick={handleDownload}
              className="w-full"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              {leadMagnet.gated ? 'Get Free Download' : 'Download Now'}
            </Button>

            {/* Testimonial */}
            {leadMagnet.testimonial && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-graphite italic mb-1">
                  "{leadMagnet.testimonial.quote}"
                </p>
                <p className="text-xs font-medium text-ink">
                  — {leadMagnet.testimonial.name}
                  {leadMagnet.testimonial.role && (
                    <span className="text-graphite font-normal">
                      , {leadMagnet.testimonial.role}
                    </span>
                  )}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={showEmailCapture}
        onClose={() => setShowEmailCapture(false)}
        resource={leadMagnet}
        onSuccess={() => {
          setShowEmailCapture(false);
          // Trigger actual download
          window.open(leadMagnet.downloadUrl, '_blank');
        }}
      />
    </>
  );
};

export default LeadMagnetCard;
