'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Play, 
  Clock, 
  Download,
  Headphones,
  Filter
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AudioContent } from '@/types/multimedia';
import { sampleAudio, searchContent, filterByCategory } from '@/lib/multimedia-data';

interface AudioLibraryProps {
  onAudioSelect?: (audio: AudioContent) => void;
  featured?: boolean;
}

const AudioLibrary: React.FC<AudioLibraryProps> = ({ 
  onAudioSelect,
  featured = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [audio, setAudio] = useState<AudioContent[]>(
    featured ? sampleAudio.filter(a => a.featured) : sampleAudio
  );

  const audioTypes = [
    'all',
    'sermon',
    'interview', 
    'podcast',
    'conference',
    'teaching'
  ];

  // Handle search and filtering
  React.useEffect(() => {
    let filteredAudio = featured ? sampleAudio.filter(a => a.featured) : sampleAudio;
    
    if (searchTerm) {
      filteredAudio = searchContent(filteredAudio, searchTerm) as AudioContent[];
    }
    
    if (selectedType !== 'all') {
      filteredAudio = filterByCategory(filteredAudio, selectedType) as AudioContent[];
    }
    
    setAudio(filteredAudio);
  }, [searchTerm, selectedType, featured]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full">
      {!featured && (
        <div className="mb-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-display-lg font-display font-bold text-ink mb-2">
              Audio Library
            </h1>
            <p className="text-lg text-graphite">
              Listen to sermons, interviews, podcasts, and teachings from Alan Hirsch
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-graphite h-4 w-4" />
              <Input
                placeholder="Search audio content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {audioTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className="capitalize"
                >
                  {type === 'all' ? 'All Types' : type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Audio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {audio.map((audioItem) => (
            <motion.div
              key={audioItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-paper rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onAudioSelect?.(audioItem)}
            >
              {/* Audio Visual */}
              <div className="relative aspect-video bg-gradient-to-br from-forest to-indigo flex items-center justify-center">
                <div className="text-center text-paper">
                  <div className="w-16 h-16 bg-paper/20 rounded-full flex items-center justify-center mb-3">
                    <Headphones className="h-8 w-8" />
                  </div>
                  <p className="text-sm opacity-90 font-medium">Audio Content</p>
                </div>
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="h-5 w-5 text-forest ml-1" />
                  </div>
                </div>
                
                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {formatDuration(audioItem.duration)}
                </div>

                {/* Featured Badge */}
                {audioItem.featured && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="default" className="bg-rust text-white">
                      Featured
                    </Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-display font-semibold text-ink mb-2 line-clamp-2">
                  {audioItem.title}
                </h3>

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-graphite mb-3">
                  <Badge variant="secondary" className="text-xs capitalize">
                    {audioItem.type}
                  </Badge>
                  {audioItem.downloadUrl && (
                    <Download className="h-3 w-3" />
                  )}
                </div>

                {/* Chapters indicator */}
                {audioItem.chapters && audioItem.chapters.length > 0 && (
                  <div className="text-xs text-graphite mb-2">
                    {audioItem.chapters.length} chapters
                  </div>
                )}

                {/* Related Content */}
                {audioItem.relatedContent.length > 0 && (
                  <div className="text-xs text-graphite">
                    Related to {audioItem.relatedContent.length} other content
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {audio.length === 0 && (
        <div className="text-center py-12">
          <div className="text-graphite mb-4">
            <Headphones className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No audio content found</h3>
            <p>Try adjusting your search terms or filters</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setSelectedType('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default AudioLibrary;
