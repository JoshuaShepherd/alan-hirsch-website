import React, { useState, useRef } from 'react'
import { Upload, X, Image, Loader2, AlertCircle, Check } from 'lucide-react'
import { useImageUpload, useDragAndDrop, useImagePreview } from '@/hooks/useImageUpload'
import { cn } from '@/lib/utils'

interface FeaturedImageUploaderProps {
  value?: string // Current image URL
  onChange?: (url: string | null) => void
  userId: string
  disabled?: boolean
  className?: string
}

export function FeaturedImageUploader({
  value,
  onChange,
  userId,
  disabled = false,
  className
}: FeaturedImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [urlInput, setUrlInput] = useState(value || '')
  const [inputMode, setInputMode] = useState<'upload' | 'url'>('upload')

  const { uploading, progress, error, result, uploadImage, reset } = useImageUpload({
    onSuccess: (uploadResult) => {
      const imageUrl = uploadResult.optimized.length > 0 
        ? uploadResult.optimized[uploadResult.optimized.length - 1].url
        : uploadResult.original.url
      onChange?.(imageUrl)
    },
    onError: (error) => {
      console.error('Upload failed:', error)
    }
  })

  const { isDragging, dragProps } = useDragAndDrop({
    onFilesDropped: async (files) => {
      if (files.length > 0 && !disabled) {
        await handleFileUpload(files[0])
      }
    },
    maxFiles: 1
  })

  const { previews, addPreview, clearPreviews } = useImagePreview()

  const handleFileUpload = async (file: File) => {
    if (disabled) return

    try {
      reset()
      clearPreviews()
      await addPreview(file, 'featured')
      await uploadImage(file, userId)
    } catch (error) {
      console.error('Upload error:', error)
    }
  }

  const handleFileSelect = () => {
    if (disabled) return
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange?.(urlInput.trim())
    }
  }

  const handleClear = () => {
    onChange?.(null)
    setUrlInput('')
    reset()
    clearPreviews()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const currentImageUrl = result ? (
    result.optimized.length > 0 
      ? result.optimized[result.optimized.length - 1].url
      : result.original.url
  ) : value

  const previewUrl = previews['featured'] || currentImageUrl

  return (
    <div className={cn('space-y-4', className)}>
      {/* Mode Selector */}
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => setInputMode('upload')}
          className={cn(
            'px-3 py-1 text-sm rounded-md transition-colors',
            inputMode === 'upload'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
              : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
          )}
        >
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setInputMode('url')}
          className={cn(
            'px-3 py-1 text-sm rounded-md transition-colors',
            inputMode === 'url'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
              : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
          )}
        >
          Image URL
        </button>
      </div>

      {inputMode === 'upload' ? (
        <div className="space-y-4">
          {/* Upload Area */}
          <div
            {...dragProps}
            className={cn(
              'relative border-2 border-dashed rounded-lg p-6 text-center transition-colors',
              isDragging
                ? 'border-blue-400 bg-blue-50 dark:bg-blue-950'
                : 'border-gray-300 dark:border-gray-600',
              disabled && 'opacity-50 cursor-not-allowed',
              !disabled && 'hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer'
            )}
            onClick={handleFileSelect}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
              disabled={disabled}
            />

            {uploading ? (
              <div className="space-y-3">
                <Loader2 className="w-8 h-8 mx-auto text-blue-600 animate-spin" />
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Uploading... {progress}%
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="w-8 h-8 mx-auto text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Drag & drop an image here, or{' '}
                    <span className="text-blue-600 hover:text-blue-700">click to browse</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Supports JPEG, PNG, GIF, WebP, SVG (max 10MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              <button
                type="button"
                onClick={reset}
                className="ml-auto p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex space-x-2">
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              disabled={disabled}
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              disabled={disabled || !urlInput.trim()}
              className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Set
            </button>
          </div>
        </div>
      )}

      {/* Preview */}
      {previewUrl && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Featured Image Preview
            </h4>
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center space-x-1 px-2 py-1 text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <X className="w-3 h-3" />
              <span>Remove</span>
            </button>
          </div>
          
          <div className="relative bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <img
              src={previewUrl}
              alt="Featured image preview"
              className="w-full max-w-sm mx-auto rounded-lg shadow-sm"
              style={{ aspectRatio: '16/9', objectFit: 'cover' }}
            />
            
            {result && (
              <div className="absolute top-2 right-2 flex items-center space-x-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-md text-xs">
                <Check className="w-3 h-3" />
                <span>Uploaded</span>
              </div>
            )}
          </div>

          {result && result.optimized.length > 0 && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <p>✓ Optimized versions: {result.optimized.map(opt => opt.type).join(', ')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}