'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Video,
  Star,
  DollarSign,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Event } from '@/types/payment';
import { calculateEventPrice } from '@/lib/payment-data';

interface EventCardProps {
  event: Event;
  onRegister: () => void;
  featured?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRegister, featured = false }) => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'workshop': return '🔧';
      case 'conference': return '🎤';
      case 'webinar': return '💻';
      case 'masterclass': return '🎓';
      case 'retreat': return '🏞️';
      default: return '📅';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'virtual': return <Video className="h-4 w-4" />;
      case 'in-person': return <MapPin className="h-4 w-4" />;
      case 'hybrid': return <Users className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const isEventSoldOut = (): boolean => {
    return event.maxAttendees ? event.currentAttendees >= event.maxAttendees : false;
  };

  const getAvailableSpots = (): number | null => {
    return event.maxAttendees ? event.maxAttendees - event.currentAttendees : null;
  };

  const isEarlyBird = (): boolean => {
    return event.earlyBirdPrice && event.earlyBirdDeadline 
      ? new Date() < event.earlyBirdDeadline 
      : false;
  };

  const currentPrice = calculateEventPrice(event);
  const soldOut = isEventSoldOut();
  const availableSpots = getAvailableSpots();
  const earlyBird = isEarlyBird();

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`h-full overflow-hidden ${featured ? 'ring-2 ring-indigo-200 shadow-lg' : ''}`}>
        {/* Event Image */}
        <div className="relative">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {featured && (
              <Badge className="bg-indigo-600 text-white">
                Featured
              </Badge>
            )}
            {earlyBird && (
              <Badge className="bg-green-600 text-white">
                Early Bird
              </Badge>
            )}
            {soldOut && (
              <Badge variant="destructive">
                Sold Out
              </Badge>
            )}
          </div>

          {/* Format Badge */}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/90">
              {getFormatIcon(event.format)}
              <span className="ml-1 capitalize">{event.format}</span>
            </Badge>
          </div>

          {/* Available Spots Warning */}
          {availableSpots && availableSpots <= 10 && !soldOut && (
            <div className="absolute bottom-2 left-2">
              <Badge variant="destructive" className="bg-orange-500">
                <AlertCircle className="h-3 w-3 mr-1" />
                {availableSpots} spots left
              </Badge>
            </div>
          )}
        </div>

        <CardHeader>
          {/* Event Type and Category */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getEventTypeIcon(event.type)}</span>
              <Badge variant="outline" className="text-xs">
                {event.category}
              </Badge>
            </div>
            {event.testimonials && event.testimonials.length > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-amber-500 fill-current" />
                <span className="text-sm font-medium">
                  {event.testimonials.reduce((acc, t) => acc + (t.rating || 5), 0) / event.testimonials.length}
                </span>
              </div>
            )}
          </div>

          <CardTitle className="text-lg leading-tight">
            {event.title}
          </CardTitle>
          
          {event.subtitle && (
            <p className="text-sm text-indigo-600 font-medium">
              {event.subtitle}
            </p>
          )}

          <CardDescription className="text-sm">
            {event.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Event Details */}
          <div className="space-y-3 mb-4">
            {/* Date and Time */}
            <div className="flex items-center gap-2 text-sm text-graphite">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(event.startDate)}</span>
              {event.startDate.toDateString() !== event.endDate.toDateString() && (
                <span>- {formatDate(event.endDate)}</span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-graphite">
              <Clock className="h-4 w-4" />
              <span>{formatTime(event.startDate)} - {formatTime(event.endDate)} {event.timezone}</span>
            </div>

            {/* Location */}
            {event.format !== 'virtual' && event.location && (
              <div className="flex items-center gap-2 text-sm text-graphite">
                <MapPin className="h-4 w-4" />
                <span>{event.location.city}, {event.location.state || event.location.country}</span>
              </div>
            )}

            {/* Instructor */}
            <div className="flex items-center gap-2 text-sm text-graphite">
              <Users className="h-4 w-4" />
              <span>Led by {event.instructor}</span>
            </div>

            {/* Attendance */}
            <div className="flex items-center gap-2 text-sm text-graphite">
              <Users className="h-4 w-4" />
              <span>
                {event.currentAttendees} registered
                {event.maxAttendees && ` of ${event.maxAttendees}`}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {event.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{event.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-ink">
                ${currentPrice}
              </span>
              {event.originalPrice && currentPrice < event.originalPrice && (
                <span className="text-sm text-graphite line-through">
                  ${event.originalPrice}
                </span>
              )}
              {earlyBird && (
                <Badge className="bg-green-100 text-green-800 text-xs">
                  Save ${(event.price - currentPrice)}
                </Badge>
              )}
            </div>
          </div>

          {/* Early Bird Deadline */}
          {earlyBird && event.earlyBirdDeadline && (
            <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-green-800">
                <CheckCircle2 className="h-3 w-3 inline mr-1" />
                Early bird pricing ends {formatDate(event.earlyBirdDeadline)}
              </p>
            </div>
          )}

          {/* Register Button */}
          <Button
            onClick={onRegister}
            disabled={soldOut}
            className="w-full"
            size="lg"
          >
            {soldOut ? 'Sold Out' : `Register Now - $${currentPrice}`}
          </Button>

          {/* Learning Outcomes Preview */}
          {event.learningOutcomes.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-medium text-graphite mb-2">What you'll learn:</p>
              <ul className="text-xs text-graphite space-y-1">
                {event.learningOutcomes.slice(0, 3).map((outcome, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
                {event.learningOutcomes.length > 3 && (
                  <li className="text-indigo-600 text-xs">
                    +{event.learningOutcomes.length - 3} more outcomes
                  </li>
                )}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EventCard;
