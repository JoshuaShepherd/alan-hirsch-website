'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Clock, 
  User,
  Download,
  Copy,
  PlayCircle
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TranscriptDocument, TranscriptSegment } from '@/types/multimedia';

interface TranscriptPanelProps {
  transcript: TranscriptDocument;
  currentTime?: number;
  onSeekTo?: (time: number) => void;
  className?: string;
}

const TranscriptPanel: React.FC<TranscriptPanelProps> = ({
  transcript,
  currentTime = 0,
  onSeekTo,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSegments, setFilteredSegments] = useState<TranscriptSegment[]>(transcript.segments);
  const [highlightedSegmentId, setHighlightedSegmentId] = useState<string | null>(null);

  // Filter segments based on search
  useEffect(() => {
    if (!searchTerm) {
      setFilteredSegments(transcript.segments);
      return;
    }

    const filtered = transcript.segments.filter(segment =>
      segment.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (segment.speaker && segment.speaker.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredSegments(filtered);
  }, [searchTerm, transcript.segments]);

  // Find current active segment
  const currentSegment = transcript.segments.find(segment =>
    currentTime >= segment.startTime && currentTime <= segment.endTime
  );

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCopyTranscript = async () => {
    const transcriptText = transcript.segments
      .map(segment => {
        const time = formatTime(segment.startTime);
        const speaker = segment.speaker ? `${segment.speaker}: ` : '';
        return `[${time}] ${speaker}${segment.text}`;
      })
      .join('\n\n');

    try {
      await navigator.clipboard.writeText(transcriptText);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy transcript:', error);
    }
  };

  const handleDownloadTranscript = () => {
    const transcriptText = transcript.segments
      .map(segment => {
        const time = formatTime(segment.startTime);
        const speaker = segment.speaker ? `${segment.speaker}: ` : '';
        return `[${time}] ${speaker}${segment.text}`;
      })
      .join('\n\n');

    const blob = new Blob([transcriptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript-${transcript.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const highlightSearchTerm = (text: string) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.toLowerCase() === searchTerm.toLowerCase()) {
        return (
          <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  return (
    <div className={`bg-paper rounded-lg shadow-md ${className}`}>
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-semibold text-ink">
            Transcript
          </h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyTranscript}
              title="Copy transcript"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownloadTranscript}
              title="Download transcript"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-graphite h-4 w-4" />
          <Input
            placeholder="Search transcript..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 mt-3 text-sm text-graphite">
          <span>{transcript.segments.length} segments</span>
          <span>{transcript.contentType} content</span>
          {searchTerm && (
            <Badge variant="secondary" className="text-xs">
              {filteredSegments.length} results
            </Badge>
          )}
        </div>
      </div>

      {/* Transcript Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredSegments.map((segment) => {
            const isActive = currentSegment?.id === segment.id;
            const isHighlighted = highlightedSegmentId === segment.id;

            return (
              <motion.div
                key={segment.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-4 p-3 rounded-lg cursor-pointer transition-colors ${
                  isActive 
                    ? 'bg-indigo/10 border-l-4 border-indigo' 
                    : isHighlighted
                    ? 'bg-yellow-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onSeekTo?.(segment.startTime)}
                onMouseEnter={() => setHighlightedSegmentId(segment.id)}
                onMouseLeave={() => setHighlightedSegmentId(null)}
              >
                {/* Segment Header */}
                <div className="flex items-center gap-2 mb-2">
                  <button
                    className="text-xs text-indigo hover:text-indigo-700 font-medium flex items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSeekTo?.(segment.startTime);
                    }}
                  >
                    <Clock className="h-3 w-3" />
                    {formatTime(segment.startTime)}
                  </button>
                  
                  {segment.speaker && (
                    <Badge variant="outline" className="text-xs">
                      <User className="h-3 w-3 mr-1" />
                      {segment.speaker}
                    </Badge>
                  )}
                  
                  {isActive && (
                    <Badge variant="default" className="text-xs">
                      <PlayCircle className="h-3 w-3 mr-1" />
                      Playing
                    </Badge>
                  )}
                </div>

                {/* Segment Text */}
                <p className="text-sm text-graphite leading-relaxed">
                  {highlightSearchTerm(segment.text)}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Empty State */}
        {filteredSegments.length === 0 && searchTerm && (
          <div className="text-center py-8">
            <Search className="h-8 w-8 mx-auto mb-2 text-graphite opacity-50" />
            <p className="text-sm text-graphite">
              No results found for "{searchTerm}"
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchTerm('')}
              className="mt-2"
            >
              Clear search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptPanel;
