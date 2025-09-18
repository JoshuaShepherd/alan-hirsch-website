import { VideoContent, AudioContent } from '@/types/multimedia';

// Sample video content data
export const sampleVideos: VideoContent[] = [
  {
    id: 'forgotten-ways-keynote',
    title: 'The Forgotten Ways - Keynote Address',
    description: 'A comprehensive exploration of apostolic genius and how the early church\'s DNA can transform modern Christianity.',
    category: 'Conference',
    tags: ['Apostolic Genius', 'Missional DNA', 'Church Planting', 'Movement'],
    duration: 3240, // 54 minutes
    uploadDate: new Date('2024-10-15'),
    videoUrl: '/videos/forgotten-ways-keynote.mp4',
    thumbnailUrl: '/images/video-thumbnails/forgotten-ways-keynote.jpg',
    transcriptId: 'transcript-forgotten-ways-keynote',
    seriesId: 'missional-foundations',
    relatedBooks: ['the-forgotten-ways', 'the-permanent-revolution'],
    downloadable: true,
    accessibility: {
      captions: true,
      audioDescription: false,
      transcript: true
    },
    viewCount: 15420,
    featured: true
  },
  {
    id: 'apest-deep-dive',
    title: 'APEST Leadership Framework Deep Dive',
    description: 'An in-depth teaching on implementing the five-fold ministry in modern church contexts.',
    category: 'Teaching',
    tags: ['APEST', 'Leadership', 'Five-fold Ministry', 'Team Building'],
    duration: 2880, // 48 minutes
    uploadDate: new Date('2024-11-02'),
    videoUrl: '/videos/apest-deep-dive.mp4',
    thumbnailUrl: '/images/video-thumbnails/apest-deep-dive.jpg',
    transcriptId: 'transcript-apest-deep-dive',
    seriesId: 'apest-masterclass',
    relatedBooks: ['5q'],
    downloadable: true,
    accessibility: {
      captions: true,
      audioDescription: false,
      transcript: true
    },
    viewCount: 8750,
    featured: true
  },
  {
    id: 'post-christendom-mission',
    title: 'Mission in a Post-Christendom World',
    description: 'How to engage in effective evangelism and church planting in secular, post-Christian societies.',
    category: 'Teaching',
    tags: ['Post-Christendom', 'Evangelism', 'Mission', 'Cultural Context'],
    duration: 2520, // 42 minutes
    uploadDate: new Date('2024-12-10'),
    videoUrl: '/videos/post-christendom-mission.mp4',
    thumbnailUrl: '/images/video-thumbnails/post-christendom-mission.jpg',
    transcriptId: 'transcript-post-christendom-mission',
    relatedBooks: ['rejesus', 'the-shaping-of-things-to-come'],
    downloadable: true,
    accessibility: {
      captions: true,
      audioDescription: false,
      transcript: true
    },
    viewCount: 6230,
    featured: true
  },
  {
    id: 'hirsch-interview-megachurch',
    title: 'Rethinking the Megachurch Model',
    description: 'Interview discussion on alternative church models and the future of Christian community.',
    category: 'Interview',
    tags: ['Church Models', 'Megachurch', 'Community', 'Future Church'],
    duration: 1980, // 33 minutes
    uploadDate: new Date('2024-09-22'),
    videoUrl: '/videos/megachurch-interview.mp4',
    thumbnailUrl: '/images/video-thumbnails/megachurch-interview.jpg',
    transcriptId: 'transcript-megachurch-interview',
    relatedBooks: ['the-shaping-of-things-to-come'],
    downloadable: false,
    accessibility: {
      captions: true,
      audioDescription: false,
      transcript: true
    },
    viewCount: 12100,
    featured: false
  },
  {
    id: 'discipleship-workshop',
    title: 'Making Disciples, Not Just Church Members',
    description: 'Workshop on authentic discipleship practices that create mature followers of Jesus.',
    category: 'Workshop',
    tags: ['Discipleship', 'Spiritual Formation', 'Church Growth', 'Maturity'],
    duration: 4320, // 72 minutes
    uploadDate: new Date('2024-08-18'),
    videoUrl: '/videos/discipleship-workshop.mp4',
    thumbnailUrl: '/images/video-thumbnails/discipleship-workshop.jpg',
    transcriptId: 'transcript-discipleship-workshop',
    seriesId: 'discipleship-intensive',
    relatedBooks: ['disciplism'],
    downloadable: true,
    accessibility: {
      captions: true,
      audioDescription: false,
      transcript: true
    },
    viewCount: 9880,
    featured: false
  }
];

// Sample audio content data
export const sampleAudio: AudioContent[] = [
  {
    id: 'movemental-podcast-01',
    title: 'Movemental Christianity: What It Really Means',
    type: 'podcast',
    audioUrl: '/audio/movemental-podcast-01.mp3',
    duration: 2160, // 36 minutes
    chapters: [
      { startTime: 0, title: 'Introduction to Movemental Thinking', description: 'Setting the foundation' },
      { startTime: 420, title: 'Historical Context', description: 'How movements shaped Christianity' },
      { startTime: 1080, title: 'Modern Applications', description: 'Implementing movemental principles today' },
      { startTime: 1620, title: 'Practical Steps', description: 'Where to start in your context' }
    ],
    transcriptId: 'transcript-movemental-podcast-01',
    relatedContent: ['forgotten-ways-keynote', 'apest-deep-dive'],
    downloadUrl: '/downloads/movemental-podcast-01.mp3',
    featured: true
  },
  {
    id: 'sunday-sermon-ephesians',
    title: 'Ephesians 4:11-16 - The Five-Fold Ministry',
    type: 'sermon',
    audioUrl: '/audio/ephesians-sermon.mp3',
    duration: 2520, // 42 minutes
    chapters: [
      { startTime: 0, title: 'Opening and Context', description: 'Setting up Ephesians 4' },
      { startTime: 300, title: 'The Five Gifts Explained', description: 'APEST breakdown' },
      { startTime: 1200, title: 'Unity and Maturity', description: 'The purpose of the gifts' },
      { startTime: 1800, title: 'Practical Application', description: 'Living out the five-fold ministry' }
    ],
    transcriptId: 'transcript-ephesians-sermon',
    relatedContent: ['apest-deep-dive'],
    downloadUrl: '/downloads/ephesians-sermon.mp3',
    featured: true
  },
  {
    id: 'conference-interview-2024',
    title: 'The Future of Missional Churches',
    type: 'interview',
    audioUrl: '/audio/conference-interview-2024.mp3',
    duration: 1800, // 30 minutes
    chapters: [
      { startTime: 0, title: 'Current State of the Church', description: 'Assessment of where we are' },
      { startTime: 600, title: 'Emerging Trends', description: 'What\'s changing in church culture' },
      { startTime: 1200, title: 'Practical Advice', description: 'Steps for church leaders' }
    ],
    transcriptId: 'transcript-conference-interview-2024',
    relatedContent: ['post-christendom-mission'],
    downloadUrl: '/downloads/conference-interview-2024.mp3',
    featured: false
  }
];

// Helper functions for content management
export function getVideoById(id: string): VideoContent | undefined {
  return sampleVideos.find(video => video.id === id);
}

export function getAudioById(id: string): AudioContent | undefined {
  return sampleAudio.find(audio => audio.id === id);
}

export function getVideosByCategory(category: VideoContent['category']): VideoContent[] {
  return sampleVideos.filter(video => video.category === category);
}

export function getAudioByType(type: AudioContent['type']): AudioContent[] {
  return sampleAudio.filter(audio => audio.type === type);
}

export function getFeaturedVideos(): VideoContent[] {
  return sampleVideos.filter(video => video.featured);
}

export function getFeaturedAudio(): AudioContent[] {
  return sampleAudio.filter(audio => audio.featured);
}

export function searchContent(content: (VideoContent | AudioContent)[], query: string): (VideoContent | AudioContent)[] {
  const lowercaseQuery = query.toLowerCase();
  return content.filter(item => {
    if ('description' in item) {
      // VideoContent
      return item.title.toLowerCase().includes(lowercaseQuery) ||
             item.description.toLowerCase().includes(lowercaseQuery) ||
             item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery));
    } else {
      // AudioContent
      return item.title.toLowerCase().includes(lowercaseQuery) ||
             item.type.toLowerCase().includes(lowercaseQuery);
    }
  });
}

export function filterByCategory(content: (VideoContent | AudioContent)[], category: string): (VideoContent | AudioContent)[] {
  return content.filter(item => {
    if ('category' in item) {
      // VideoContent
      return item.category === category;
    } else {
      // AudioContent
      return item.type === category;
    }
  });
}

// Sample transcript data
export const sampleTranscripts = [
  {
    id: 'transcript-forgotten-ways-keynote',
    contentId: 'forgotten-ways-keynote',
    contentType: 'video' as const,
    segments: [
      {
        id: 'seg-1',
        startTime: 0,
        endTime: 15,
        text: "Welcome everyone to this exploration of the Forgotten Ways. Today we're going to dive deep into what I call apostolic genius.",
        confidence: 0.95,
        keywords: ['welcome', 'forgotten ways', 'apostolic genius'],
        relatedConcepts: ['missional DNA', 'church planting'],
        editedBy: 'human' as const
      },
      {
        id: 'seg-2',
        startTime: 15,
        endTime: 45,
        text: "The early church had something we've lost - a DNA, a genetic code that enabled extraordinary multiplication and movement.",
        confidence: 0.92,
        keywords: ['early church', 'DNA', 'multiplication'],
        relatedConcepts: ['movement dynamics', 'organic growth'],
        editedBy: 'human' as const
      }
    ],
    summary: "Alan Hirsch introduces the concept of apostolic genius and the DNA of the early church.",
    keyTopics: ['Apostolic Genius', 'Missional DNA', 'Church Multiplication'],
    quotes: [],
    searchIndex: {
      title: 'The Forgotten Ways - Keynote Address',
      content: 'apostolic genius missional DNA church planting movement',
      tags: ['keynote', 'forgotten ways', 'apostolic'],
      searchableText: 'Welcome everyone to this exploration of the Forgotten Ways apostolic genius'
    }
  }
];
