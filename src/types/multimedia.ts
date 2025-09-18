// Core types for the multimedia system
export interface VideoContent {
  id: string;
  title: string;
  description: string;
  category: 'Teaching' | 'Interview' | 'Conference' | 'Workshop' | 'Podcast';
  tags: string[];
  duration: number;
  uploadDate: Date;
  videoUrl: string;
  thumbnailUrl: string;
  transcriptId?: string;
  seriesId?: string;
  relatedBooks?: string[];
  downloadable: boolean;
  accessibility: {
    captions: boolean;
    audioDescription?: boolean;
    transcript: boolean;
  };
  viewCount: number;
  featured: boolean;
}

export interface AudioContent {
  id: string;
  title: string;
  type: 'sermon' | 'interview' | 'podcast' | 'conference' | 'teaching';
  audioUrl: string;
  duration: number;
  waveformData?: number[];
  chapters?: Chapter[];
  transcriptId: string;
  relatedContent: string[];
  downloadUrl?: string;
  featured: boolean;
}

export interface Chapter {
  startTime: number;
  title: string;
  description?: string;
}

export interface TranscriptSegment {
  id: string;
  startTime: number;
  endTime: number;
  speaker?: string;
  text: string;
  confidence: number;
  keywords: string[];
  relatedConcepts: string[];
  editedBy?: 'ai' | 'human';
}

export interface TranscriptDocument {
  id: string;
  contentId: string;
  contentType: 'video' | 'audio' | 'podcast';
  segments: TranscriptSegment[];
  summary: string;
  keyTopics: string[];
  actionItems?: string[];
  quotes: QuotableSegment[];
  searchIndex: SearchableContent;
}

export interface QuotableSegment {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  context: string;
  shareUrl: string;
}

export interface SearchableContent {
  title: string;
  content: string;
  tags: string[];
  searchableText: string;
}

export interface ContentInsights {
  popularSegments: TranscriptSegment[];
  dropOffPoints: number[];
  engagementScore: number;
  topSearchTerms: string[];
  suggestedFollowUp: {
    articles: string[];
    videos: string[];
    assessments: string[];
  };
}

export interface MediaPlayerState {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number;
  playbackRate: number;
  currentChapter?: Chapter;
  showTranscript: boolean;
  transcriptSearchTerm: string;
}
