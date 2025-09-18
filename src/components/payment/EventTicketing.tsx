'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Filter,
  Search,
  Video,
  Ticket,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

import { sampleEvents, getFeaturedEvents, searchEvents } from '@/lib/payment-data';
import { Event } from '@/types/payment';
import EventCard from '@/components/payment/EventCard';
import EventRegistrationModal from '@/components/payment/EventRegistrationModal';

const EventTicketing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const [filteredEvents, setFilteredEvents] = useState<Event[]>(sampleEvents);
  const upcomingEvents = sampleEvents.filter((event: Event) => event.status === 'published');
  const featuredEvents = sampleEvents.filter((event: Event) => event.featured);

  // Filter events based on search and filters
  useEffect(() => {
    let filtered = sampleEvents.filter((event: Event) => event.status === 'published');

    if (searchTerm) {
      filtered = searchEvents(searchTerm);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((event: Event) => 
        event.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (selectedFormat !== 'all') {
      filtered = filtered.filter((event: Event) => event.format === selectedFormat);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory, selectedFormat]);

  const categories = Array.from(new Set(sampleEvents.map((event: Event) => event.category)));

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

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

  const isEventSoldOut = (event: Event): boolean => {
    return event.maxAttendees ? event.currentAttendees >= event.maxAttendees : false;
  };

  const getAvailableSpots = (event: Event): number | null => {
    return event.maxAttendees ? event.maxAttendees - event.currentAttendees : null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Ticket className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-display font-bold text-ink">
              Events & Training
            </h1>
          </div>
          <p className="text-lg text-graphite max-w-2xl mx-auto">
            Join Alan Hirsch and other movement leaders for transformative workshops, 
            conferences, and masterclasses designed to equip you for missional impact.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-graphite h-5 w-5" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-[200px] h-12">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category as string} value={category as string}>
                    {category as string}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Format Filter */}
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="w-full lg:w-[200px] h-12">
                <SelectValue placeholder="All Formats" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="virtual">Virtual</SelectItem>
                <SelectItem value="in-person">In-Person</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <p className="text-sm text-graphite">
            {filteredEvents.length} events found
          </p>
        </motion.div>

        {/* Featured Events */}
        {!searchTerm && selectedCategory === 'all' && selectedFormat === 'all' && featuredEvents.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-display font-semibold text-ink mb-6">
              Featured Events
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.slice(0, 3).map((event: Event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={() => handleEventSelect(event)}
                  featured
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Event Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="virtual">Virtual</TabsTrigger>
            <TabsTrigger value="in-person">In-Person</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    layout
                  >
                    <EventCard
                      event={event}
                      onRegister={() => handleEventSelect(event)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event: Event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={() => handleEventSelect(event)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="virtual" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.filter(e => e.format === 'virtual').map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={() => handleEventSelect(event)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in-person" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.filter(e => e.format === 'in-person').map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={() => handleEventSelect(event)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-graphite mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No events found</h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedFormat('all');
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Call to Action */}
        {!searchTerm && selectedCategory === 'all' && selectedFormat === 'all' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center"
          >
            <h2 className="text-2xl font-display font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              We're always developing new training programs and events. 
              Join our mailing list to be the first to know about upcoming opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Input
                placeholder="Enter your email address"
                className="max-w-sm bg-white text-gray-900"
              />
              <Button variant="secondary" size="lg">
                Notify Me
              </Button>
            </div>
          </motion.section>
        )}
      </div>

      {/* Registration Modal */}
      {selectedEvent && (
        <EventRegistrationModal
          event={selectedEvent}
          isOpen={showRegistrationModal}
          onClose={() => {
            setShowRegistrationModal(false);
            setSelectedEvent(null);
          }}
          onSubmit={(registration) => {
            // Handle registration submission
            console.log('Registration submitted:', registration);
            setShowRegistrationModal(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
};

export default EventTicketing;
