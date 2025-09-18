'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, Star, ChevronRight, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ReadingList } from '@/types/resource-library';

interface ReadingListCardProps {
  readingList: ReadingList;
  variant?: 'default' | 'featured';
}

const ReadingListCard: React.FC<ReadingListCardProps> = ({ 
  readingList, 
  variant = 'default' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      case 'mixed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewList = () => {
    // Navigate to detailed reading list page
    console.log('Navigate to reading list:', readingList.id);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`h-full ${variant === 'featured' ? 'border-indigo-200 shadow-lg' : ''}`}>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                <CardTitle className="text-lg font-semibold text-ink leading-tight">
                  {readingList.title}
                </CardTitle>
              </div>
              <CardDescription className="text-sm text-graphite">
                {readingList.description}
              </CardDescription>
            </div>
            {variant === 'featured' && (
              <Badge className="bg-indigo-600">
                Featured
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Curator Info */}
          <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-indigo-600">
                {readingList.curator.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-ink">Curated by {readingList.curator}</p>
              <div className="flex items-center gap-2 text-xs text-graphite">
                <Users className="h-3 w-3" />
                <span>{readingList.followers.toLocaleString()} followers</span>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className={getDifficultyColor(readingList.difficulty)}>
              {readingList.difficulty}
            </Badge>
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              {readingList.estimatedReadingTime}
            </Badge>
            <Badge variant="outline">
              <BookOpen className="h-3 w-3 mr-1" />
              {readingList.books.length} books
            </Badge>
            {readingList.additionalResources && readingList.additionalResources.length > 0 && (
              <Badge variant="outline">
                +{readingList.additionalResources.length} resources
              </Badge>
            )}
          </div>

          {/* Topics */}
          <div className="mb-4">
            <p className="text-xs font-medium text-graphite mb-2">Topics:</p>
            <div className="flex flex-wrap gap-1">
              {readingList.topics.slice(0, 4).map((topic) => (
                <Badge key={topic} variant="outline" className="text-xs">
                  {topic}
                </Badge>
              ))}
              {readingList.topics.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{readingList.topics.length - 4}
                </Badge>
              )}
            </div>
          </div>

          {/* Book Preview */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-graphite">Featured Books:</p>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                {isExpanded ? 'Show less' : 'View all'}
                <ChevronRight className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </button>
            </div>
            
            <div className="space-y-2">
              {(isExpanded ? readingList.books : readingList.books.slice(0, 3)).map((book) => (
                <div key={book.id} className="flex items-center gap-3 p-2 bg-white border border-gray-100 rounded-lg">
                  {book.coverImageUrl && (
                    <img
                      src={book.coverImageUrl}
                      alt={book.title}
                      className="w-8 h-10 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{book.title}</p>
                    <p className="text-xs text-graphite">{book.author}</p>
                    {book.rating && (
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 text-amber-400 fill-current" />
                        <span className="text-xs text-graphite">{book.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                  {book.difficulty && (
                    <Badge className={getDifficultyColor(book.difficulty)} variant="outline">
                      {book.difficulty}
                    </Badge>
                  )}
                </div>
              ))}
              
              {!isExpanded && readingList.books.length > 3 && (
                <div className="text-xs text-graphite text-center py-2">
                  And {readingList.books.length - 3} more books...
                </div>
              )}
            </div>
          </div>

          {/* Additional Resources Preview */}
          {readingList.additionalResources && readingList.additionalResources.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-medium text-graphite mb-2">Additional Resources:</p>
              <div className="space-y-1">
                {readingList.additionalResources.slice(0, 2).map((resource) => (
                  <div key={resource.id} className="flex items-center gap-2 text-xs">
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                    <span className="text-graphite truncate">{resource.title}</span>
                    <Badge variant="outline" className="text-xs ml-auto">
                      {resource.type}
                    </Badge>
                  </div>
                ))}
                {readingList.additionalResources.length > 2 && (
                  <div className="text-xs text-graphite italic">
                    +{readingList.additionalResources.length - 2} more resources
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Button */}
          <Button 
            onClick={handleViewList}
            className="w-full"
            size="sm"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            View Complete List
          </Button>

          {/* Tags */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-1">
              {readingList.tags?.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {readingList.tags && readingList.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{readingList.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReadingListCard;
