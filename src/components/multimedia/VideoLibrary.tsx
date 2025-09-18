'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Play, 
  Clock, 
  Eye,
  Download,
  Tag
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VideoContent } from '@/types/multimedia';
import { sampleVideos, searchContent, filterByCategory } from '@/lib/multimedia-data';

interface VideoLibraryProps {
  onVideoSelect?: (video: VideoContent) => void;
  featured?: boolean;
}

const VideoLibrary: React.FC<VideoLibraryProps> = ({ 
  onVideoSelect,
  featured = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [videos, setVideos] = useState<VideoContent[]>(
    featured ? sampleVideos.filter(v => v.featured) : sampleVideos
  );

  const categories = [
    'all',
    'Teaching',
    'Interview', 
    'Conference',
    'Workshop',
    'Podcast'
  ];

  // Handle search and filtering
  React.useEffect(() => {
    let filteredVideos = featured ? sampleVideos.filter(v => v.featured) : sampleVideos;
    
    if (searchTerm) {
      filteredVideos = searchContent(filteredVideos, searchTerm) as VideoContent[];
    }
    
    if (selectedCategory !== 'all') {
      filteredVideos = filterByCategory(filteredVideos, selectedCategory) as VideoContent[];
    }
    
    setVideos(filteredVideos);
  }, [searchTerm, selectedCategory, featured]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="w-full">
      {!featured && (
        <div className="mb-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-display-lg font-display font-bold text-ink mb-2">
              Video Library
            </h1>
            <p className="text-lg text-graphite">
              Explore Alan's teachings, interviews, and conference presentations
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-graphite h-4 w-4" />
              <Input
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === 'all' ? 'All Categories' : category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {videos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-paper rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onVideoSelect?.(video)}
            >
              {/* Thumbnail */}
              <div className="relative">
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="h-5 w-5 text-forest ml-1" />
                  </div>
                </div>
                
                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {formatDuration(video.duration)}
                </div>

                {/* Featured Badge */}
                {video.featured && (
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
                  {video.title}
                </h3>
                <p className="text-sm text-graphite mb-3 line-clamp-2">
                  {video.description}
                </p>

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-graphite mb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {video.viewCount.toLocaleString()}
                    </span>
                    <span>{formatDate(video.uploadDate)}</span>
                  </div>
                  {video.downloadable && (
                    <Download className="h-3 w-3" />
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {video.category}
                  </Badge>
                  {video.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {video.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{video.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {videos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-graphite mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No videos found</h3>
            <p>Try adjusting your search terms or filters</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoLibrary;
