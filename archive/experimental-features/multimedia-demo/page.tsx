'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VideoContent, AudioContent, TranscriptDocument } from '@/types/multimedia';
import UnifiedMediaPlayer from '@/components/multimedia/UnifiedMediaPlayer';
import VideoLibrary from '@/components/multimedia/VideoLibrary';
import AudioLibrary from '@/components/multimedia/AudioLibrary';
import TranscriptPanel from '@/components/multimedia/TranscriptPanel';
import { sampleVideos, sampleAudio, sampleTranscripts } from '@/lib/multimedia-data';

export default function MultimediaDemo() {
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<AudioContent | null>(null);
  const [showTranscript, setShowTranscript] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const handleVideoSelect = (video: VideoContent) => {
    setSelectedVideo(video);
    setSelectedAudio(null);
  };

  const handleAudioSelect = (audio: AudioContent) => {
    setSelectedAudio(audio);
    setSelectedVideo(null);
  };

  const getTranscriptForContent = (): TranscriptDocument | undefined => {
    const contentId = selectedVideo?.id || selectedAudio?.id;
    if (!contentId) return undefined;
    
    return sampleTranscripts.find(t => t.contentId === contentId);
  };

  const currentTranscript = getTranscriptForContent();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-display font-bold text-ink mb-4">
              Multimedia System Demo
            </h1>
            <p className="text-lg text-graphite max-w-2xl mx-auto">
              Experience the comprehensive multimedia platform featuring video library, 
              audio player integration, and advanced transcript systems.
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge variant="default">Video Library ✅</Badge>
              <Badge variant="default">Audio Player ✅</Badge>
              <Badge variant="default">Transcript System ✅</Badge>
            </div>
          </motion.div>
        </div>

        {/* Current Media Player */}
        {(selectedVideo || selectedAudio) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Media Player */}
              <div className="lg:col-span-2">
                <UnifiedMediaPlayer
                  content={selectedVideo || selectedAudio!}
                  type={selectedVideo ? 'video' : 'audio'}
                  showTranscript={showTranscript}
                  transcript={currentTranscript}
                  onTimeUpdate={setCurrentTime}
                />
              </div>

              {/* Transcript Panel */}
              {showTranscript && currentTranscript && (
                <div className="lg:col-span-1">
                  <TranscriptPanel
                    transcript={currentTranscript}
                    currentTime={currentTime}
                    onSeekTo={(time) => {
                      // In a real implementation, this would seek the media player
                      setCurrentTime(time);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Player Controls */}
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                onClick={() => setShowTranscript(!showTranscript)}
              >
                {showTranscript ? 'Hide' : 'Show'} Transcript
              </Button>
            </div>
          </motion.div>
        )}

        {/* Content Tabs */}
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="videos">Video Library</TabsTrigger>
            <TabsTrigger value="audio">Audio Library</TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <VideoLibrary 
                onVideoSelect={handleVideoSelect}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <AudioLibrary 
                onAudioSelect={handleAudioSelect}
              />
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 bg-white rounded-lg shadow-md"
        >
          <h3 className="text-lg font-display font-semibold text-ink mb-4">
            System Implementation Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">📹</span>
              </div>
              <h4 className="font-medium text-ink">Video Library</h4>
              <p className="text-sm text-graphite">
                Complete with search, filtering, and categorization
              </p>
              <Badge variant="default" className="mt-2">✅ Complete</Badge>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🎵</span>
              </div>
              <h4 className="font-medium text-ink">Audio Player Integration</h4>
              <p className="text-sm text-graphite">
                Advanced player with chapters and controls
              </p>
              <Badge variant="default" className="mt-2">✅ Complete</Badge>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">📝</span>
              </div>
              <h4 className="font-medium text-ink">Transcript Systems</h4>
              <p className="text-sm text-graphite">
                Interactive transcripts with search and sync
              </p>
              <Badge variant="default" className="mt-2">✅ Complete</Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
