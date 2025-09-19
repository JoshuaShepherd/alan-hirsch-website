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
  Video, 
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
  Image as ImageIcon,
  Captions,
  Plus
} from 'lucide-react'

interface VideoFile {
  file: File
  preview: string
  duration?: number
  size: string
}

interface VideoMetadata {
  title: string
  description: string
  tags: string[]
  category: string
  series?: string
  thumbnail?: string
  transcript?: string
  chapterMarkers?: { time: number; title: string }[]
  publishDate?: string
  status: 'draft' | 'published' | 'scheduled'
}

interface VideoUploadManagerProps {
  onVideoSave?: (videoData: any) => void
  onVideoPublish?: (videoData: any) => void
}

const videoCategories = [
  'Teaching Series',
  'Quick Insights', 
  'Behind the Scenes',
  'Interviews',
  'Conference Talks',
  'Q&A Sessions',
  'Book Discussions',
  'Partner Spotlights'
]

const videoSeries = [
  'Missional Church Foundations',
  'APEST Leadership',
  'Movement Building',
  'Church Multiplication',
  'Leadership Development',
  'Theological Reflections'
]

export function VideoUploadManager({ onVideoSave, onVideoPublish }: VideoUploadManagerProps) {
  const [videoFile, setVideoFile] = useState<VideoFile | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [metadata, setMetadata] = useState<VideoMetadata>({
    title: '',
    description: '',
    tags: [],
    category: '',
    series: '',
    status: 'draft'
  })
  const [currentTag, setCurrentTag] = useState('')
  const [chapters, setChapters] = useState<{ time: number; title: string }[]>([])
  const [newChapter, setNewChapter] = useState({ time: 0, title: '' })
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const transcriptInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      const preview = URL.createObjectURL(file)
      const size = formatFileSize(file.size)
      setVideoFile({ file, preview, size })
      
      // Auto-generate title from filename
      const fileName = file.name.replace(/\.[^/.]+$/, "")
      setMetadata(prev => ({ ...prev, title: fileName }))
    }
  }

  const handleThumbnailSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setThumbnailFile(file)
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

  const addTag = () => {
    if (currentTag.trim() && !metadata.tags.includes(currentTag.trim())) {
      setMetadata(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }))
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setMetadata(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const addChapter = () => {
    if (newChapter.title.trim() && newChapter.time >= 0) {
      setChapters(prev => [...prev, newChapter].sort((a, b) => a.time - b.time))
      setNewChapter({ time: 0, title: '' })
    }
  }

  const removeChapter = (index: number) => {
    setChapters(prev => prev.filter((_, i) => i !== index))
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleUpload = async () => {
    if (!videoFile || !metadata.title) return

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

      // Here you would implement actual video upload to your storage service
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 3000))

      setUploadProgress(100)
      
      const videoData = {
        id: Date.now().toString(),
        ...metadata,
        file: videoFile,
        thumbnail: thumbnailFile,
        transcript: transcriptFile,
        chapters,
        uploadedAt: new Date().toISOString(),
        fileSize: videoFile.size,
        duration: videoFile.duration
      }

      onVideoSave?.(videoData)
      
      // Reset form
      setVideoFile(null)
      setMetadata({
        title: '',
        description: '',
        tags: [],
        category: '',
        series: '',
        status: 'draft'
      })
      setChapters([])
      setThumbnailFile(null)
      setTranscriptFile(null)
      setUploadProgress(0)

    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handlePublish = () => {
    if (metadata.status === 'published') {
      onVideoPublish?.({ ...metadata, status: 'draft' })
    } else {
      onVideoPublish?.({ ...metadata, status: 'published' })
    }
  }

  return (
    <div className="space-y-6">
      {/* Video Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            Video Upload
          </CardTitle>
          <CardDescription>
            Upload and manage video content for your thought leadership platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!videoFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">Drop your video here</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                or click to browse files
              </p>
              <p className="text-sm text-gray-400">
                Supports MP4, MOV, AVI (max 2GB)
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{videoFile.file.name}</span>
                  <span className="text-sm text-gray-500">{videoFile.size}</span>
                </div>
                <video
                  src={videoFile.preview}
                  controls
                  className="w-full max-h-64 rounded"
                />
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
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </CardContent>
      </Card>

      {videoFile && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Video Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="video-title">Title *</Label>
                <Input
                  id="video-title"
                  value={metadata.title}
                  onChange={(e) => setMetadata(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter video title"
                />
              </div>

              <div>
                <Label htmlFor="video-description">Description</Label>
                <Textarea
                  id="video-description"
                  value={metadata.description}
                  onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your video content..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="video-category">Category</Label>
                  <Select
                    value={metadata.category}
                    onValueChange={(value) => setMetadata(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {videoCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="video-series">Series (Optional)</Label>
                  <Select
                    value={metadata.series}
                    onValueChange={(value) => setMetadata(prev => ({ ...prev, series: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select series" />
                    </SelectTrigger>
                    <SelectContent>
                      {videoSeries.map(series => (
                        <SelectItem key={series} value={series}>{series}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  {metadata.tags.map(tag => (
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
                Additional Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Thumbnail Upload */}
              <div>
                <Label>Custom Thumbnail</Label>
                <div className="mt-2">
                  <Button
                    variant="outline"
                    onClick={() => thumbnailInputRef.current?.click()}
                    className="w-full flex items-center gap-2"
                  >
                    <ImageIcon className="w-4 h-4" />
                    {thumbnailFile ? thumbnailFile.name : 'Upload Thumbnail'}
                  </Button>
                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailSelect}
                    className="hidden"
                  />
                </div>
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
                    <Captions className="w-4 h-4" />
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

              {/* Chapter Markers */}
              <div>
                <Label>Chapter Markers</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Time (seconds)"
                      value={newChapter.time}
                      onChange={(e) => setNewChapter(prev => ({ ...prev, time: parseInt(e.target.value) || 0 }))}
                      className="w-32"
                    />
                    <Input
                      placeholder="Chapter title"
                      value={newChapter.title}
                      onChange={(e) => setNewChapter(prev => ({ ...prev, title: e.target.value }))}
                    />
                    <Button onClick={addChapter} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {chapters.map((chapter, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded">
                      <span className="text-sm">
                        {formatTime(chapter.time)} - {chapter.title}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeChapter(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Publish Settings */}
              <div>
                <Label>Publishing</Label>
                <div className="space-y-2 mt-2">
                  <Select
                    value={metadata.status}
                    onValueChange={(value: any) => setMetadata(prev => ({ ...prev, status: value }))}
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

                  {metadata.status === 'scheduled' && (
                    <Input
                      type="datetime-local"
                      value={metadata.publishDate}
                      onChange={(e) => setMetadata(prev => ({ ...prev, publishDate: e.target.value }))}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Actions */}
      {videoFile && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4 justify-end">
              <Button
                variant="outline"
                onClick={() => setVideoFile(null)}
                disabled={isUploading}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Video
              </Button>
              
              <Button
                onClick={handleUpload}
                disabled={isUploading || !metadata.title}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Save Video'}
              </Button>

              {metadata.status === 'published' && (
                <Button
                  onClick={handlePublish}
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