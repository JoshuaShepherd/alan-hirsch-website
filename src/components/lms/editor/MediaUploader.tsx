'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  File, 
  Image, 
  Video, 
  FileAudio, 
  FileText, 
  X, 
  Check,
  AlertCircle 
} from 'lucide-react'

interface MediaFile {
  id: string
  name: string
  size: number
  type: string
  url?: string
  uploadProgress?: number
  status: 'uploading' | 'completed' | 'error'
  error?: string
}

interface MediaUploaderProps {
  onUpload: (files: MediaFile[]) => void
  acceptedFileTypes?: string[]
  maxFileSize?: number // in bytes
  maxFiles?: number
  existingFiles?: MediaFile[]
}

export function MediaUploader({ 
  onUpload, 
  acceptedFileTypes = ['image/*', 'video/*', 'audio/*', '.pdf', '.doc', '.docx'],
  maxFileSize = 50 * 1024 * 1024, // 50MB
  maxFiles = 10,
  existingFiles = []
}: MediaUploaderProps) {
  const [files, setFiles] = useState<MediaFile[]>(existingFiles)
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (files.length + acceptedFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`)
      return
    }

    setIsUploading(true)
    
    const newFiles: MediaFile[] = acceptedFiles.map(file => ({
      id: `${Date.now()}-${file.name}`,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadProgress: 0,
      status: 'uploading' as const
    }))

    setFiles(prev => [...prev, ...newFiles])

    // Simulate upload process
    for (const [index, file] of acceptedFiles.entries()) {
      const mediaFile = newFiles[index]
      
      try {
        // In a real implementation, you would upload to Supabase Storage here
        // This simulates the upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100))
          
          setFiles(prev => prev.map(f => 
            f.id === mediaFile.id 
              ? { ...f, uploadProgress: progress }
              : f
          ))
        }

        // Simulate successful upload
        const uploadedUrl = `https://example.com/uploads/${file.name}`
        
        setFiles(prev => prev.map(f => 
          f.id === mediaFile.id 
            ? { 
                ...f, 
                status: 'completed' as const,
                url: uploadedUrl,
                uploadProgress: 100 
              }
            : f
        ))
        
      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === mediaFile.id 
            ? { 
                ...f, 
                status: 'error' as const,
                error: 'Upload failed'
              }
            : f
        ))
      }
    }

    setIsUploading(false)
    
    // Call the onUpload callback with completed files
    const completedFiles = files.filter(f => f.status === 'completed')
    if (completedFiles.length > 0) {
      onUpload(completedFiles)
    }
  }, [files, maxFiles, onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = []
      return acc
    }, {} as Record<string, string[]>),
    maxSize: maxFileSize,
    disabled: isUploading
  })

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const retryUpload = (fileId: string) => {
    // In a real implementation, you would retry the upload
    setFiles(prev => prev.map(f => 
      f.id === fileId 
        ? { ...f, status: 'uploading' as const, uploadProgress: 0, error: undefined }
        : f
    ))
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-4 w-4" />
    if (type.startsWith('video/')) return <Video className="h-4 w-4" />
    if (type.startsWith('audio/')) return <FileAudio className="h-4 w-4" />
    if (type.includes('pdf') || type.includes('document')) return <FileText className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <Card 
        {...getRootProps()}
        className={`p-8 border-2 border-dashed cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-lms-brand bg-lms-brand/5' 
            : 'border-border hover:border-lms-brand/50'
        } ${isUploading ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          {isDragActive ? (
            <p className="text-lg font-medium text-lms-brand">Drop files here...</p>
          ) : (
            <div>
              <p className="text-lg font-medium text-foreground mb-2">
                Drag & drop files here, or click to select
              </p>
              <p className="text-sm text-muted-foreground">
                Supports images, videos, audio files, and documents up to {formatFileSize(maxFileSize)}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Files ({files.length})</h4>
          {files.map((file) => (
            <Card key={file.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {getFileIcon(file.type)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{file.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{formatFileSize(file.size)}</span>
                      <Badge 
                        variant={
                          file.status === 'completed' ? 'default' :
                          file.status === 'error' ? 'destructive' : 'secondary'
                        }
                        className="text-xs"
                      >
                        {file.status === 'completed' && <Check className="h-3 w-3 mr-1" />}
                        {file.status === 'error' && <AlertCircle className="h-3 w-3 mr-1" />}
                        {file.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {file.status === 'error' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => retryUpload(file.id)}
                    >
                      Retry
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Progress Bar */}
              {file.status === 'uploading' && (
                <div className="mt-3">
                  <Progress value={file.uploadProgress || 0} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Uploading... {file.uploadProgress || 0}%
                  </p>
                </div>
              )}
              
              {/* Error Message */}
              {file.status === 'error' && file.error && (
                <p className="text-xs text-destructive mt-2">{file.error}</p>
              )}
              
              {/* Success URL */}
              {file.status === 'completed' && file.url && (
                <p className="text-xs text-muted-foreground mt-2 font-mono truncate">
                  {file.url}
                </p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

// Simplified Media Library component for selecting existing files
interface MediaLibraryProps {
  onSelect: (file: MediaFile) => void
  fileType?: 'image' | 'video' | 'audio' | 'document' | 'all'
}

export function MediaLibrary({ onSelect, fileType = 'all' }: MediaLibraryProps) {
  // Mock data - in a real app this would come from your API
  const mockFiles: MediaFile[] = [
    {
      id: '1',
      name: 'lesson-image-1.jpg',
      size: 1024 * 500, // 500KB
      type: 'image/jpeg',
      url: 'https://example.com/uploads/lesson-image-1.jpg',
      status: 'completed'
    },
    {
      id: '2',
      name: 'intro-video.mp4',
      size: 1024 * 1024 * 10, // 10MB
      type: 'video/mp4',
      url: 'https://example.com/uploads/intro-video.mp4',
      status: 'completed'
    },
    {
      id: '3',
      name: 'lesson-notes.pdf',
      size: 1024 * 200, // 200KB
      type: 'application/pdf',
      url: 'https://example.com/uploads/lesson-notes.pdf',
      status: 'completed'
    }
  ]

  const filteredFiles = mockFiles.filter(file => {
    if (fileType === 'all') return true
    if (fileType === 'image') return file.type.startsWith('image/')
    if (fileType === 'video') return file.type.startsWith('video/')
    if (fileType === 'audio') return file.type.startsWith('audio/')
    if (fileType === 'document') return file.type.includes('pdf') || file.type.includes('document')
    return true
  })

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-8 w-8" />
    if (type.startsWith('video/')) return <Video className="h-8 w-8" />
    if (type.startsWith('audio/')) return <FileAudio className="h-8 w-8" />
    if (type.includes('pdf') || type.includes('document')) return <FileText className="h-8 w-8" />
    return <File className="h-8 w-8" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-foreground">Media Library</h4>
      
      {filteredFiles.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <File className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No files found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredFiles.map((file) => (
            <Card 
              key={file.id} 
              className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => onSelect(file)}
            >
              <div className="flex items-center gap-3">
                <div className="text-muted-foreground">
                  {getFileIcon(file.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
