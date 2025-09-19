import { useState, useCallback } from 'react'
import { imageStorage, ImageUploadResult, UploadProgress } from '@/lib/storage'

export interface UseImageUploadState {
  uploading: boolean
  progress: number
  error: string | null
  result: ImageUploadResult | null
}

export interface UseImageUploadOptions {
  onSuccess?: (result: ImageUploadResult) => void
  onError?: (error: string) => void
  optimized?: boolean // Whether to use Edge Function optimization
}

export function useImageUpload(options: UseImageUploadOptions = {}) {
  const [state, setState] = useState<UseImageUploadState>({
    uploading: false,
    progress: 0,
    error: null,
    result: null
  })

  const uploadImage = useCallback(async (file: File, userId: string) => {
    setState({
      uploading: true,
      progress: 0,
      error: null,
      result: null
    })

    try {
      const onProgress = (progress: UploadProgress) => {
        setState(prev => ({ ...prev, progress: progress.percentage }))
      }

      let result: ImageUploadResult

      if (options.optimized !== false) {
        // Try optimized upload first
        try {
          result = await imageStorage.uploadImage(file, userId, onProgress)
        } catch (error) {
          console.warn('Optimized upload failed, falling back to direct upload:', error)
          // Fallback to direct upload
          const directResult = await imageStorage.uploadImageDirect(file, userId, onProgress)
          result = {
            original: {
              path: directResult.path,
              url: directResult.url,
              size: file.size
            },
            optimized: []
          }
        }
      } else {
        // Direct upload only
        const directResult = await imageStorage.uploadImageDirect(file, userId, onProgress)
        result = {
          original: {
            path: directResult.path,
            url: directResult.url,
            size: file.size
          },
          optimized: []
        }
      }

      setState({
        uploading: false,
        progress: 100,
        error: null,
        result
      })

      options.onSuccess?.(result)
      return result

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      
      setState({
        uploading: false,
        progress: 0,
        error: errorMessage,
        result: null
      })

      options.onError?.(errorMessage)
      throw error
    }
  }, [options])

  const reset = useCallback(() => {
    setState({
      uploading: false,
      progress: 0,
      error: null,
      result: null
    })
  }, [])

  return {
    ...state,
    uploadImage,
    reset
  }
}

export interface UseDragAndDropOptions {
  onFilesDropped?: (files: File[]) => void
  acceptedTypes?: string[]
  maxFiles?: number
  maxFileSize?: number
}

export function useDragAndDrop(options: UseDragAndDropOptions = {}) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragCounter, setDragCounter] = useState(0)

  const acceptedTypes = options.acceptedTypes || [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ]

  const maxFiles = options.maxFiles || 1
  const maxFileSize = options.maxFileSize || 10 * 1024 * 1024 // 10MB

  const validateFiles = useCallback((files: File[]): File[] => {
    const validFiles: File[] = []

    for (const file of files) {
      if (!acceptedTypes.includes(file.type)) {
        console.warn(`File ${file.name} has invalid type: ${file.type}`)
        continue
      }

      if (file.size > maxFileSize) {
        console.warn(`File ${file.name} is too large: ${file.size} bytes`)
        continue
      }

      validFiles.push(file)
    }

    return validFiles.slice(0, maxFiles)
  }, [acceptedTypes, maxFiles, maxFileSize])

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setDragCounter(prev => prev + 1)
    
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true)
    }
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setDragCounter(prev => prev - 1)
    
    if (dragCounter <= 1) {
      setIsDragging(false)
    }
  }, [dragCounter])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsDragging(false)
    setDragCounter(0)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files)
      const validFiles = validateFiles(files)
      
      if (validFiles.length > 0) {
        options.onFilesDropped?.(validFiles)
      }
    }
  }, [validateFiles, options])

  const dragProps = {
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDrop: handleDrop
  }

  return {
    isDragging,
    dragProps,
    validateFiles
  }
}

export interface UseImagePreviewOptions {
  maxPreviewSize?: number // in pixels
}

export function useImagePreview(options: UseImagePreviewOptions = {}) {
  const [previews, setPreviews] = useState<{ [key: string]: string }>({})
  
  const maxPreviewSize = options.maxPreviewSize || 300

  const generatePreview = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
          if (e.target?.result) {
            const img = new Image()
            img.onload = () => {
              // Create canvas for resizing
              const canvas = document.createElement('canvas')
              const ctx = canvas.getContext('2d')
              
              if (!ctx) {
                resolve(e.target!.result as string)
                return
              }            // Calculate dimensions
            let { width, height } = img
            if (width > height) {
              if (width > maxPreviewSize) {
                height = (height * maxPreviewSize) / width
                width = maxPreviewSize
              }
            } else {
              if (height > maxPreviewSize) {
                width = (width * maxPreviewSize) / height
                height = maxPreviewSize
              }
            }

            canvas.width = width
            canvas.height = height

            // Draw and compress
            ctx.drawImage(img, 0, 0, width, height)
            resolve(canvas.toDataURL('image/jpeg', 0.7))
          }
          
          img.src = e.target.result as string
        } else {
          reject(new Error('Failed to read file'))
        }
      }
      
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
  }, [maxPreviewSize])

  const addPreview = useCallback(async (file: File, key?: string) => {
    try {
      const previewKey = key || file.name
      const previewUrl = await generatePreview(file)
      
      setPreviews(prev => ({
        ...prev,
        [previewKey]: previewUrl
      }))
      
      return previewUrl
    } catch (error) {
      console.error('Failed to generate preview:', error)
      return null
    }
  }, [generatePreview])

  const removePreview = useCallback((key: string) => {
    setPreviews(prev => {
      const newPreviews = { ...prev }
      delete newPreviews[key]
      return newPreviews
    })
  }, [])

  const clearPreviews = useCallback(() => {
    setPreviews({})
  }, [])

  return {
    previews,
    addPreview,
    removePreview,
    clearPreviews
  }
}