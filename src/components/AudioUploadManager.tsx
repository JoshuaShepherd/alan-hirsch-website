'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Upload, 
  Mic, 
  Play, 
  Pause, 
  Volume2, 
  Settings, 
  Save,
  Trash2,
  Eye,
  Globe,
  Calendar,
  Clock,
  FileText,
  Tag,
  Users,
  Rss,
  Plus,
  Edit
} from 'lucide-react'

interface AudioFile {
  file: File
  preview: string
  duration?: number
  size: string
}

interface PodcastEpisode {
  title: string
  description: string
  episodeNumber?: number
  seasonNumber?: number
  guests: string[]
  tags: string[]
  showNotes: string
  transcript?: string
  publishDate?: string
  status: 'draft' | 'published' | 'scheduled'
  duration?: number
}

interface AudioUploadManagerProps {
  onEpisodeSave?: (episodeData: any) => void
  onEpisodePublish?: (episodeData: any) => void
}

const podcastShows = [
  'The Missional Leader Podcast',
  'APEST Insights',
  'Movement Stories',
  'Church Leadership Conversations',
  'Theological Reflections'
]

const episodeCategories = [
  'Teaching',
  'Interview',
  'Solo Reflection',
  'Q&A Session',
  'Panel Discussion',
  'Book Discussion',
  'Case Study'
]

export function AudioUploadManager({ onEpisodeSave, onEpisodePublish }: AudioUploadManagerProps) {
  const [audioFile, setAudioFile] = useState<AudioFile | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [episode, setEpisode] = useState<PodcastEpisode>({
    title: '',
    description: '',
    guests: [],
    tags: [],
    showNotes: '',
    status: 'draft'
  })
  const [currentGuest, setCurrentGuest] = useState('')
  const [currentTag, setCurrentTag] = useState('')
  const [selectedShow, setSelectedShow] = useState('')
  const [category, setCategory] = useState('')
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const transcriptInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('audio/')) {
      const preview = URL.createObjectURL(file)
      const size = formatFileSize(file.size)
      setAudioFile({ file, preview, size })
      
      // Auto-generate title from filename
      const fileName = file.name.replace(/\.[^/.]+$/, "")
      setEpisode(prev => ({ ...prev, title: fileName }))
    }
  }

  const handleTranscriptSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setTranscriptFile(file)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const addGuest = () => {
    if (currentGuest.trim() && !episode.guests.includes(currentGuest.trim())) {
      setEpisode(prev => ({
        ...prev,
        guests: [...prev.guests, currentGuest.trim()]
      }))
      setCurrentGuest('')
    }
  }

  const removeGuest = (guestToRemove: string) => {
    setEpisode(prev => ({
      ...prev,
      guests: prev.guests.filter(guest => guest !== guestToRemove)
    }))
  }

  const addTag = () => {
    if (currentTag.trim() && !episode.tags.includes(currentTag.trim())) {
      setEpisode(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }))
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setEpisode(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleUpload = async () => {
    if (!audioFile || !episode.title) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval)
            return prev
          }
          return prev + Math.random() * 10
        })
      }, 500)

      // Here you would implement actual audio upload to your storage service
      await new Promise(resolve => setTimeout(resolve, 3000))

      setUploadProgress(100)
      
      const episodeData = {
        id: Date.now().toString(),
        ...episode,
        audioFile,
        transcript: transcriptFile,
        show: selectedShow,
        category,
        uploadedAt: new Date().toISOString(),
        fileSize: audioFile.size,
        duration: audioFile.duration
      }

      onEpisodeSave?.(episodeData)
      
      // Reset form
      setAudioFile(null)
      setEpisode({
        title: '',
        description: '',
        guests: [],
        tags: [],
        showNotes: '',
        status: 'draft'
      })
      setTranscriptFile(null)
      setUploadProgress(0)

    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Audio Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            Podcast Episode Upload
          </CardTitle>
          <CardDescription>
            Upload and manage podcast episodes and audio content
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!audioFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">Drop your audio file here</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                or click to browse files
              </p>
              <p className="text-sm text-gray-400">
                Supports MP3, WAV, M4A (max 500MB)
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">{audioFile.file.name}</span>
                  <span className="text-sm text-gray-500">{audioFile.size}</span>
                </div>
                
                {/* Audio Player */}
                <div className="flex items-center gap-4 bg-white dark:bg-gray-700 p-3 rounded">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={togglePlayback}
                    className="flex-shrink-0"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  
                  <audio
                    ref={audioRef}
                    src={audioFile.preview}
                    onLoadedMetadata={(e) => {
                      const target = e.target as HTMLAudioElement
                      setAudioFile(prev => prev ? { ...prev, duration: target.duration } : null)
                    }}
                    onEnded={() => setIsPlaying(false)}
                    className="flex-1"
                    controls
                  />
                  
                  {audioFile.duration && (
                    <span className="text-sm text-gray-500 flex-shrink-0">
                      {formatDuration(audioFile.duration)}
                    </span>
                  )}
                </div>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </CardContent>
      </Card>

      {audioFile && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Episode Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Episode Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="podcast-show">Podcast Show</Label>
                  <Select value={selectedShow} onValueChange={setSelectedShow}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select show" />
                    </SelectTrigger>
                    <SelectContent>
                      {podcastShows.map(show => (
                        <SelectItem key={show} value={show}>{show}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="episode-category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {episodeCategories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="episode-title">Episode Title *</Label>
                <Input
                  id="episode-title"
                  value={episode.title}
                  onChange={(e) => setEpisode(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter episode title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="season-number">Season #</Label>
                  <Input
                    id="season-number"
                    type="number"
                    value={episode.seasonNumber || ''}
                    onChange={(e) => setEpisode(prev => ({ ...prev, seasonNumber: parseInt(e.target.value) || undefined }))}
                    placeholder="1"
                  />
                </div>

                <div>
                  <Label htmlFor="episode-number">Episode #</Label>
                  <Input
                    id="episode-number"
                    type="number"
                    value={episode.episodeNumber || ''}
                    onChange={(e) => setEpisode(prev => ({ ...prev, episodeNumber: parseInt(e.target.value) || undefined }))}
                    placeholder="1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="episode-description">Description</Label>
                <Textarea
                  id="episode-description"
                  value={episode.description}
                  onChange={(e) => setEpisode(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your episode..."
                  rows={3}
                />
              </div>

              {/* Guests */}
              <div>
                <Label>Guests</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={currentGuest}
                    onChange={(e) => setCurrentGuest(e.target.value)}
                    placeholder="Add a guest"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGuest())}
                  />
                  <Button onClick={addGuest} size="sm">
                    <Users className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {episode.guests.map(guest => (
                    <Badge key={guest} variant="secondary" className="cursor-pointer" onClick={() => removeGuest(guest)}>
                      {guest} ×
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button onClick={addTag} size="sm">
                    <Tag className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {episode.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Episode Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Show Notes */}
              <div>
                <Label htmlFor="show-notes">Show Notes</Label>
                <Textarea
                  id="show-notes"
                  value={episode.showNotes}
                  onChange={(e) => setEpisode(prev => ({ ...prev, showNotes: e.target.value }))}
                  placeholder="Detailed show notes, links, and resources..."
                  rows={6}
                />
              </div>

              {/* Transcript Upload */}
              <div>
                <Label>Transcript File</Label>
                <div className="mt-2">
                  <Button
                    variant="outline"
                    onClick={() => transcriptInputRef.current?.click()}
                    className="w-full flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    {transcriptFile ? transcriptFile.name : 'Upload Transcript'}
                  </Button>
                  <input
                    ref={transcriptInputRef}
                    type="file"
                    accept=".txt,.srt,.vtt"
                    onChange={handleTranscriptSelect}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Publishing Settings */}
              <div>
                <Label>Publishing</Label>
                <div className="space-y-2 mt-2">
                  <Select
                    value={episode.status}
                    onValueChange={(value: any) => setEpisode(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Save as Draft</SelectItem>
                      <SelectItem value="published">Publish Now</SelectItem>
                      <SelectItem value="scheduled">Schedule for Later</SelectItem>
                    </SelectContent>
                  </Select>

                  {episode.status === 'scheduled' && (
                    <Input
                      type="datetime-local"
                      value={episode.publishDate}
                      onChange={(e) => setEpisode(prev => ({ ...prev, publishDate: e.target.value }))}
                    />
                  )}
                </div>
              </div>

              {/* RSS Feed Settings */}
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <Rss className="w-4 h-4" />
                  RSS Feed Integration
                </h4>
                <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-300">
                  <li>• Automatic RSS feed generation</li>
                  <li>• Apple Podcasts distribution</li>
                  <li>• Spotify submission ready</li>
                  <li>• Google Podcasts compatible</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Actions */}
      {audioFile && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4 justify-end">
              <Button
                variant="outline"
                onClick={() => setAudioFile(null)}
                disabled={isUploading}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Audio
              </Button>
              
              <Button
                onClick={handleUpload}
                disabled={isUploading || !episode.title}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Save Episode'}
              </Button>

              {episode.status === 'published' && (
                <Button
                  onClick={() => onEpisodePublish?.(episode)}
                  disabled={isUploading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Publish
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}