'use client'

import { useState } from 'react'
import { 
  Upload, Play, Pause, Volume2, Download, FileText,
  Clock, User, Hash, Quote, Scissors, Share,
  BookOpen, MessageCircle, Settings, RefreshCw,
  ExternalLink, Copy, Edit3, Save, Trash2,
  ChevronRight, ChevronDown, Search, Filter,
  PlayCircle, PauseCircle, SkipForward, SkipBack,
  Maximize2, Type, Headphones, Video, Mic,
  CheckCircle, AlertCircle, Loader, Star,
  Eye, MoreVertical, Calendar, Users,
  Lightbulb, Target, TrendingUp, BarChart3
} from 'lucide-react'

interface Timestamp {
  start: number
  end: number
  speaker?: string
}

interface TranscriptSegment extends Timestamp {
  id: string
  text: string
  confidence: number
  keywords?: string[]
  summary?: string
}

interface Speaker {
  id: string
  name: string
  color: string
  totalTime: number
  segments: number
}

interface TranscriptJob {
  id: string
  title: string
  source: 'upload' | 'url' | 'live'
  sourceUrl?: string
  fileName?: string
  duration: number
  status: 'processing' | 'completed' | 'error' | 'transcribing'
  progress: number
  createdAt: Date
  language: string
  speakers: Speaker[]
  segments: TranscriptSegment[]
  summary?: string
  keyTopics?: string[]
  actionItems?: string[]
  questions?: string[]
  quotes?: TranscriptSegment[]
}

interface TranscriptAgentProps {
  onUploadFile?: (file: File) => void
  onProcessUrl?: (url: string) => void
  onExportTranscript?: (jobId: string, format: 'txt' | 'srt' | 'vtt' | 'docx') => void
  onGenerateContent?: (jobId: string, type: 'summary' | 'blog' | 'social' | 'quotes') => void
}

const SpeakerBadge = ({ speaker, small = false }: { speaker: Speaker; small?: boolean }) => (
  <span
    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
      small ? 'text-[10px] px-1.5 py-0.5' : ''
    }`}
    style={{
      backgroundColor: `${speaker.color}20`,
      color: speaker.color,
      borderColor: `${speaker.color}40`,
      borderWidth: '1px'
    }}
  >
    <div
      className={`w-2 h-2 rounded-full ${small ? 'w-1.5 h-1.5' : ''}`}
      style={{ backgroundColor: speaker.color }}
    />
    {speaker.name}
  </span>
)

const StatusBadge = ({ status }: { status: TranscriptJob['status'] }) => {
  const styles = {
    processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    transcribing: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
  }

  const icons = {
    processing: RefreshCw,
    transcribing: Loader,
    completed: CheckCircle,
    error: AlertCircle
  }

  const Icon = icons[status]

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      <Icon className={`h-3 w-3 ${status === 'processing' || status === 'transcribing' ? 'animate-spin' : ''}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

export function TranscriptAgent({ 
  onUploadFile, 
  onProcessUrl, 
  onExportTranscript,
  onGenerateContent 
}: TranscriptAgentProps) {
  const [activeTab, setActiveTab] = useState<'transcribe' | 'library' | 'analytics'>('transcribe')
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file')
  const [urlToProcess, setUrlToProcess] = useState('')
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [playingSegment, setPlayingSegment] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpeaker, setSelectedSpeaker] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  // Mock data - replace with actual API calls
  const [jobs, setJobs] = useState<TranscriptJob[]>([
    {
      id: '1',
      title: 'Missional Church Leadership Podcast - Episode 47',
      source: 'upload',
      fileName: 'leadership-podcast-47.mp3',
      duration: 3420, // 57 minutes
      status: 'completed',
      progress: 100,
      createdAt: new Date('2025-08-24T10:30:00'),
      language: 'en',
      speakers: [
        {
          id: 'speaker-1',
          name: 'Alan Hirsch',
          color: '#3B82F6',
          totalTime: 2100,
          segments: 45
        },
        {
          id: 'speaker-2', 
          name: 'Guest',
          color: '#10B981',
          totalTime: 1320,
          segments: 32
        }
      ],
      segments: [
        {
          id: 'seg-1',
          start: 0,
          end: 15,
          text: "Welcome to the Missional Church Leadership podcast. I'm Alan Hirsch, and today we're discussing the future of church planting in post-Christian contexts.",
          confidence: 0.96,
          speaker: 'speaker-1',
          keywords: ['missional church', 'leadership', 'church planting', 'post-Christian'],
          summary: 'Introduction to podcast episode on church planting'
        },
        {
          id: 'seg-2',
          start: 15,
          end: 42,
          text: "The challenge we face is not just about starting new churches, but about cultivating genuine missional communities that can thrive in secular environments.",
          confidence: 0.94,
          speaker: 'speaker-1',
          keywords: ['missional communities', 'secular environments', 'church challenges'],
          summary: 'Discusses challenges of church planting in secular contexts'
        },
        {
          id: 'seg-3',
          start: 42,
          end: 68,
          text: "That's exactly right, Alan. In my experience working with church planters across Europe, the traditional models simply aren't resonating with younger generations.",
          confidence: 0.92,
          speaker: 'speaker-2',
          keywords: ['church planters', 'Europe', 'traditional models', 'younger generations'],
          summary: 'Guest shares experience with European church planting challenges'
        }
      ],
      summary: 'Discussion on the future of church planting in post-Christian contexts, focusing on the need for missional communities that can thrive in secular environments.',
      keyTopics: ['Missional Church Leadership', 'Church Planting', 'Post-Christian Context', 'Secular Environments', 'Community Building'],
      actionItems: [
        'Research successful missional communities in secular contexts',
        'Develop new church planting strategies for post-Christian societies',
        'Create training materials for cross-cultural church planters'
      ],
      questions: [
        'How can traditional churches adapt to post-Christian contexts?',
        'What role does technology play in modern church planting?',
        'How do we measure success in missional communities?'
      ],
      quotes: [
        {
          id: 'quote-1',
          start: 15,
          end: 42,
          text: "The challenge we face is not just about starting new churches, but about cultivating genuine missional communities that can thrive in secular environments.",
          confidence: 0.94,
          speaker: 'speaker-1'
        }
      ]
    },
    {
      id: '2',
      title: 'Church Leadership Conference 2025 - Keynote',
      source: 'url',
      sourceUrl: 'https://youtube.com/watch?v=example',
      duration: 2580, // 43 minutes
      status: 'processing',
      progress: 65,
      createdAt: new Date('2025-08-24T14:15:00'),
      language: 'en',
      speakers: [],
      segments: []
    }
  ])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    onUploadFile?.(file)
    
    // Mock processing
    const newJob: TranscriptJob = {
      id: Date.now().toString(),
      title: file.name.replace(/\.[^/.]+$/, ''),
      source: 'upload',
      fileName: file.name,
      duration: 0,
      status: 'processing',
      progress: 0,
      createdAt: new Date(),
      language: 'en',
      speakers: [],
      segments: []
    }

    setJobs(prev => [newJob, ...prev])
    setProcessing(true)

    // Simulate processing
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setProcessing(false)
        setJobs(prev => prev.map(job => 
          job.id === newJob.id 
            ? { ...job, status: 'completed', progress: 100 }
            : job
        ))
      } else {
        setJobs(prev => prev.map(job => 
          job.id === newJob.id 
            ? { ...job, progress }
            : job
        ))
      }
    }, 500)
  }

  const handleUrlProcessing = () => {
    if (!urlToProcess) return

    onProcessUrl?.(urlToProcess)
    
    // Mock processing
    const newJob: TranscriptJob = {
      id: Date.now().toString(),
      title: 'Video from ' + new URL(urlToProcess).hostname,
      source: 'url',
      sourceUrl: urlToProcess,
      duration: 0,
      status: 'transcribing',
      progress: 0,
      createdAt: new Date(),
      language: 'en',
      speakers: [],
      segments: []
    }

    setJobs(prev => [newJob, ...prev])
    setUrlToProcess('')
  }

  const selectedJobData = jobs.find(job => job.id === selectedJob)

  const filteredSegments = selectedJobData?.segments.filter(segment => {
    const matchesSearch = !searchQuery || 
      segment.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      segment.keywords?.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesSpeaker = !selectedSpeaker || segment.speaker === selectedSpeaker

    return matchesSearch && matchesSpeaker
  }) || []

  const completedJobs = jobs.filter(job => job.status === 'completed')
  const totalDuration = completedJobs.reduce((acc, job) => acc + job.duration, 0)
  const totalSegments = completedJobs.reduce((acc, job) => acc + job.segments.length, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Transcript Agent</h2>
          <p className="-foreground">Transcribe audio/video and extract insights automatically</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Transcript Settings
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {[
            { id: 'transcribe', label: 'New Transcript', icon: Mic },
            { id: 'library', label: 'Library', icon: FileText },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                {tab.id === 'library' && jobs.length > 0 && (
                  <span className="bg-muted text-xs rounded-full px-2 py-1 ml-1">
                    {jobs.length}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'transcribe' && (
          <div className="space-y-6">
            {/* Upload Method Selector */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Choose Upload Method</h3>
              
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setUploadMethod('file')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    uploadMethod === 'file'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <Upload className="h-4 w-4" />
                  Upload File
                </button>
                <button
                  onClick={() => setUploadMethod('url')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    uploadMethod === 'url'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <ExternalLink className="h-4 w-4" />
                  From URL
                </button>
              </div>

              {uploadMethod === 'file' && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      accept="audio/*,video/*"
                      onChange={handleFileUpload}
                      className="sr-only"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 mx-auto mb-4" />
                      <p className="text-lg font-medium text-foreground mb-2">Drop your audio/video file here</p>
                      <p className="text-sm mb-4">
                        Supports MP3, MP4, WAV, M4A and more. Max size: 2GB
                      </p>
                      <span className="btn-primary">Choose File</span>
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Headphones className="h-4 w-4" />
                      Audio: MP3, WAV, M4A, AAC
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Video: MP4, MOV, AVI, MKV
                    </div>
                  </div>
                </div>
              )}

              {uploadMethod === 'url' && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <input
                      type="url"
                      value={urlToProcess}
                      onChange={(e) => setUrlToProcess(e.target.value)}
                      placeholder="https://youtube.com/watch?v=... or https://podcast.example.com/episode.mp3"
                      className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button
                      onClick={handleUrlProcessing}
                      disabled={!urlToProcess}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Process URL
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <PlayCircle className="h-4 w-4" />
                      YouTube, Vimeo, Podcast URLs
                    </div>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Direct audio/video links
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Processing Jobs */}
            {jobs.some(job => job.status === 'processing' || job.status === 'transcribing') && (
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Processing</h3>
                <div className="space-y-4">
                  {jobs
                    .filter(job => job.status === 'processing' || job.status === 'transcribing')
                    .map(job => (
                      <div key={job.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">{job.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <StatusBadge status={job.status} />
                            <span className="text-xs">
                              {job.source === 'upload' ? job.fileName : job.sourceUrl}
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-right min-w-0">
                          <p className="text-sm font-medium text-foreground">{Math.round(job.progress)}%</p>
                          <div className="w-24 h-2 bg-muted rounded-full mt-1">
                            <div 
                              className="h-2 bg-primary rounded-full transition-all duration-300"
                              style={{ width: `${job.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'library' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search transcripts..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <button className="btn-outline flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>

            {/* Job Library */}
            <div className="space-y-4">
              {jobs.map(job => (
                <div key={job.id} className="bg-background border border-border rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <button
                            onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                            className="p-1 hover:bg-muted rounded"
                          >
                            {selectedJob === job.id ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </button>
                          <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                          <StatusBadge status={job.status} />
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm mb-4">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTime(job.duration)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {job.createdAt.toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {job.speakers.length} speakers
                          </span>
                          <span>{job.segments.length} segments</span>
                        </div>

                        {job.speakers.length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                            {job.speakers.map(speaker => (
                              <SpeakerBadge key={speaker.id} speaker={speaker} small />
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {job.status === 'completed' && (
                          <>
                            <button
                              onClick={() => onExportTranscript?.(job.id, 'txt')}
                              className="btn-outline text-sm flex items-center gap-2"
                            >
                              <Download className="h-4 w-4" />
                              Export
                            </button>
                            <button className="btn-outline text-sm flex items-center gap-2">
                              <Share className="h-4 w-4" />
                              Share
                            </button>
                          </>
                        )}
                        <button className="p-2 hover:text-foreground hover:bg-muted rounded-md transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {selectedJob === job.id && job.status === 'completed' && (
                    <div className="border-t border-border bg-muted/30">
                      {/* Transcript Controls */}
                      <div className="p-6 border-b border-border">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-foreground">Transcript</h4>
                          <div className="flex items-center gap-2">
                            {job.speakers.length > 1 && (
                              <select
                                value={selectedSpeaker || ''}
                                onChange={(e) => setSelectedSpeaker(e.target.value || null)}
                                className="px-3 py-1 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              >
                                <option value="">All speakers</option>
                                {job.speakers.map(speaker => (
                                  <option key={speaker.id} value={speaker.id}>{speaker.name}</option>
                                ))}
                              </select>
                            )}
                            <div className="relative">
                              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3" />
                              <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search transcript..."
                                className="w-48 pl-7 pr-3 py-1 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Transcript Segments */}
                        <div className="max-h-96 overflow-y-auto space-y-3">
                          {filteredSegments.map(segment => {
                            const speaker = job.speakers.find(s => s.id === segment.speaker)
                            return (
                              <div key={segment.id} className="flex gap-3 p-3 bg-background rounded-lg hover:bg-muted/50 transition-colors group">
                                <div className="flex-shrink-0 text-xs mt-1 w-16 text-right">
                                  {formatTime(segment.start)}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    {speaker && <SpeakerBadge speaker={speaker} small />}
                                    <div className="flex items-center gap-1 text-xs">
                                      <span>{Math.round(segment.confidence * 100)}% confidence</span>
                                      {segment.keywords && segment.keywords.length > 0 && (
                                        <span className="flex items-center gap-1">
                                          <Hash className="h-3 w-3" />
                                          {segment.keywords.slice(0, 2).join(', ')}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-sm text-foreground leading-relaxed">
                                    {segment.text}
                                  </p>
                                </div>
                                
                                <div className="flex items-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => setPlayingSegment(playingSegment === segment.id ? null : segment.id)}
                                    className="p-1 hover:text-foreground hover:bg-muted rounded transition-colors"
                                  >
                                    {playingSegment === segment.id ? (
                                      <PauseCircle className="h-4 w-4" />
                                    ) : (
                                      <PlayCircle className="h-4 w-4" />
                                    )}
                                  </button>
                                  <button className="p-1 hover:text-foreground hover:bg-muted rounded transition-colors">
                                    <Copy className="h-4 w-4" />
                                  </button>
                                  <button className="p-1 hover:text-foreground hover:bg-muted rounded transition-colors">
                                    <Quote className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Insights */}
                      {job.summary && (
                        <div className="p-6 space-y-6">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Summary */}
                            <div>
                              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Summary
                              </h4>
                              <p className="text-sm leading-relaxed">{job.summary}</p>
                            </div>

                            {/* Key Topics */}
                            {job.keyTopics && (
                              <div>
                                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                  <Target className="h-4 w-4" />
                                  Key Topics
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {job.keyTopics.map(topic => (
                                    <span key={topic} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Action Items & Questions */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {job.actionItems && job.actionItems.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4" />
                                  Action Items
                                </h4>
                                <ul className="space-y-2">
                                  {job.actionItems.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm">
                                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {job.questions && job.questions.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                  <MessageCircle className="h-4 w-4" />
                                  Discussion Questions
                                </h4>
                                <ul className="space-y-2">
                                  {job.questions.map((question, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm">
                                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                                      {question}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Generate Content */}
                          <div className="border-t border-border pt-6">
                            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                              <Lightbulb className="h-4 w-4" />
                              Generate Content
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => onGenerateContent?.(job.id, 'summary')}
                                className="btn-outline text-sm flex items-center gap-2"
                              >
                                <FileText className="h-4 w-4" />
                                Blog Summary
                              </button>
                              <button
                                onClick={() => onGenerateContent?.(job.id, 'social')}
                                className="btn-outline text-sm flex items-center gap-2"
                              >
                                <Share className="h-4 w-4" />
                                Social Posts
                              </button>
                              <button
                                onClick={() => onGenerateContent?.(job.id, 'quotes')}
                                className="btn-outline text-sm flex items-center gap-2"
                              >
                                <Quote className="h-4 w-4" />
                                Key Quotes
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {jobs.length === 0 && (
                <div className="bg-background border border-border rounded-lg p-12 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2">No transcripts yet</p>
                  <p className="-foreground mb-6">
                    Upload audio or video files to get started with automatic transcription and insights
                  </p>
                  <button
                    onClick={() => setActiveTab('transcribe')}
                    className="btn-primary"
                  >
                    Create First Transcript
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-background border border-border rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">{completedJobs.length}</div>
                <div className="text-sm">Total Transcripts</div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">{formatTime(totalDuration)}</div>
                <div className="text-sm">Total Duration</div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">{totalSegments}</div>
                <div className="text-sm">Total Segments</div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">94%</div>
                <div className="text-sm">Avg. Accuracy</div>
              </div>
            </div>

            {/* Top Topics */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Most Discussed Topics</h3>
              <div className="space-y-3">
                {[
                  { topic: 'Missional Church Leadership', count: 23, percentage: 85 },
                  { topic: 'Church Planting', count: 18, percentage: 67 },
                  { topic: 'Digital Ministry', count: 15, percentage: 56 },
                  { topic: 'Community Building', count: 12, percentage: 44 },
                  { topic: 'Leadership Development', count: 9, percentage: 33 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-sm">{item.topic}</span>
                      <span className="text-xs">{item.count} mentions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full">
                        <div 
                          className="h-2 bg-primary rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs w-8 text-right">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
