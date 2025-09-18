'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward,
  Settings,
  Download,
  Share2,
  FileText
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { VideoContent, AudioContent, TranscriptDocument } from '@/types/multimedia';

interface UnifiedMediaPlayerProps {
  content: VideoContent | AudioContent;
  type: 'video' | 'audio';
  autoPlay?: boolean;
  showTranscript?: boolean;
  transcript?: TranscriptDocument;
  onTimeUpdate?: (currentTime: number) => void;
}

const UnifiedMediaPlayer: React.FC<UnifiedMediaPlayerProps> = ({
  content,
  type,
  autoPlay = false,
  showTranscript = false,
  transcript,
  onTimeUpdate
}) => {
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);

  // Type guards
  const isVideoContent = (content: VideoContent | AudioContent): content is VideoContent => {
    return type === 'video';
  };

  const isAudioContent = (content: VideoContent | AudioContent): content is AudioContent => {
    return type === 'audio';
  };

  // Media event handlers
  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const handleTimeUpdate = () => {
      const time = media.currentTime;
      setCurrentTime(time);
      onTimeUpdate?.(time);
    };

    const handleDurationChange = () => {
      setDuration(media.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    media.addEventListener('timeupdate', handleTimeUpdate);
    media.addEventListener('durationchange', handleDurationChange);
    media.addEventListener('play', handlePlay);
    media.addEventListener('pause', handlePause);

    return () => {
      media.removeEventListener('timeupdate', handleTimeUpdate);
      media.removeEventListener('durationchange', handleDurationChange);
      media.removeEventListener('play', handlePlay);
      media.removeEventListener('pause', handlePause);
    };
  }, [onTimeUpdate]);

  // Control functions
  const togglePlayPause = () => {
    if (!mediaRef.current) return;
    
    if (isPlaying) {
      mediaRef.current.pause();
    } else {
      mediaRef.current.play();
    }
  };

  const handleSeek = (value: number[]) => {
    if (!mediaRef.current) return;
    const time = value[0];
    mediaRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (value: number[]) => {
    if (!mediaRef.current) return;
    const vol = value[0];
    mediaRef.current.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    if (!mediaRef.current) return;
    if (isMuted) {
      mediaRef.current.volume = volume;
      setIsMuted(false);
    } else {
      mediaRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const changePlaybackRate = (rate: number) => {
    if (!mediaRef.current) return;
    mediaRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const skipTime = (seconds: number) => {
    if (!mediaRef.current) return;
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    mediaRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const downloadContent = () => {
    if (isVideoContent(content)) {
      window.open(content.videoUrl, '_blank');
    } else if (isAudioContent(content) && content.downloadUrl) {
      window.open(content.downloadUrl, '_blank');
    }
  };

  const shareContent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: content.title,
          text: content.title,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="bg-paper rounded-lg overflow-hidden shadow-lg">
      {/* Media Element */}
      <div 
        className="relative"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {type === 'video' ? (
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            className="w-full aspect-video"
            poster={isVideoContent(content) ? content.thumbnailUrl : undefined}
            autoPlay={autoPlay}
          >
            <source src={isVideoContent(content) ? content.videoUrl : ''} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-forest to-indigo flex items-center justify-center">
            <audio
              ref={mediaRef as React.RefObject<HTMLAudioElement>}
              autoPlay={autoPlay}
            >
              <source src={isAudioContent(content) ? content.audioUrl : ''} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
            <div className="text-center text-paper">
              <div className="w-24 h-24 bg-paper/20 rounded-full flex items-center justify-center mb-4">
                <Play className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-display font-semibold">{content.title}</h3>
            </div>
          </div>
        )}

        {/* Player Overlay Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 flex items-center justify-center"
            >
              <Button
                variant="ghost"
                size="lg"
                onClick={togglePlayPause}
                className="text-white bg-black/50 hover:bg-black/70 rounded-full w-16 h-16"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Player Controls */}
      <div className="p-4 bg-white border-t">
        {/* Content Info */}
        <div className="mb-4">
          <h3 className="text-display-md font-display font-semibold text-ink mb-1">
            {content.title}
          </h3>
          <p className="text-graphite text-sm mb-2">
            {isVideoContent(content) ? content.description : 'Audio Content'}
          </p>
          <div className="flex items-center gap-2 text-xs text-graphite">
            <Badge variant="secondary" className="text-xs">
              {isVideoContent(content) ? content.category : content.type}
            </Badge>
            {isVideoContent(content) && (
              <span>{content.viewCount} views</span>
            )}
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-graphite mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => skipTime(-10)}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={togglePlayPause}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => skipTime(10)}>
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
                className="w-20"
              />
            </div>

            {/* Settings Menu */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-4 w-4" />
              </Button>
              
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute bottom-full right-0 mb-2 bg-white border rounded-lg shadow-lg p-2 min-w-[120px] z-50"
                  >
                    <div className="text-sm font-medium mb-2">Speed</div>
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => changePlaybackRate(rate)}
                        className={`block w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100 ${
                          playbackRate === rate ? 'bg-indigo text-white' : ''
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            {((isVideoContent(content)) || (isAudioContent(content) && content.downloadUrl)) && (
              <Button variant="ghost" size="sm" onClick={downloadContent}>
                <Download className="h-4 w-4" />
              </Button>
            )}
            
            <Button variant="ghost" size="sm" onClick={shareContent}>
              <Share2 className="h-4 w-4" />
            </Button>

            {showTranscript && (
              <Button variant="ghost" size="sm">
                <FileText className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Chapters (for audio content) */}
        {isAudioContent(content) && content.chapters && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Chapters</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {content.chapters.map((chapter, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (mediaRef.current) {
                      mediaRef.current.currentTime = chapter.startTime;
                      setCurrentChapter(index);
                    }
                  }}
                  className={`block w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100 ${
                    currentChapter === index ? 'bg-indigo text-white' : ''
                  }`}
                >
                  <span className="font-medium">{chapter.title}</span>
                  <span className="text-xs opacity-75 ml-2">
                    {formatTime(chapter.startTime)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Transcript Panel */}
      {showTranscript && transcript && (
        <div className="border-t bg-gray-50 p-4">
          <h4 className="text-sm font-medium mb-2">Transcript</h4>
          <div className="max-h-40 overflow-y-auto text-sm space-y-2">
            {transcript.segments.map((segment, index) => (
              <div
                key={index}
                className={`p-2 rounded cursor-pointer ${
                  currentTime >= segment.startTime && currentTime <= segment.endTime
                    ? 'bg-indigo text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  if (mediaRef.current) {
                    mediaRef.current.currentTime = segment.startTime;
                  }
                }}
              >
                <span className="text-xs opacity-75">
                  {formatTime(segment.startTime)}
                </span>
                <p className="mt-1">{segment.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedMediaPlayer;
