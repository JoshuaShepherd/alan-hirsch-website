import React, { useState, useRef } from 'react'
import { 
  Image as ImageIcon, 
  Upload, 
  X, 
  Loader2, 
  AlertCircle, 
  Link, 
  Type,
  Check
} from 'lucide-react'
import { useImageUpload, useDragAndDrop, useImagePreview } from '@/hooks/useImageUpload'
import { imageStorage } from '@/lib/storage'
import { cn } from '@/lib/utils'

interface InlineImageUploaderProps {
  userId: string
  onImageInsert: (markdown: string) => void
  onClose: () => void
  className?: string
}

interface ImageInsertOptions {
  altText: string
  title?: string
  alignment?: 'left' | 'center' | 'right'
  size?: 'small' | 'medium' | 'large' | 'original'
}

export function InlineImageUploader({
  userId,
  onImageInsert,
  onClose,
  className
}: InlineImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [insertMode, setInsertMode] = useState<'upload' | 'url'>('upload')
  const [urlInput, setUrlInput] = useState('')
  const [imageOptions, setImageOptions] = useState<ImageInsertOptions>({
    altText: '',
    title: '',
    alignment: 'center',
    size: 'medium'
  })

  const { uploading, progress, error, result, uploadImage, reset } = useImageUpload({
    onSuccess: (uploadResult) => {
      // Auto-fill alt text from filename if not provided
      if (!imageOptions.altText && fileInputRef.current?.files?.[0]) {
        const fileName = fileInputRef.current.files[0].name
        const baseName = fileName.split('.')[0].replace(/[-_]/g, ' ')
        setImageOptions(prev => ({ ...prev, altText: baseName }))
      }
    }
  })

  const { isDragging, dragProps } = useDragAndDrop({
    onFilesDropped: async (files) => {
      if (files.length > 0) {
        await handleFileUpload(files[0])
      }
    },
    maxFiles: 1
  })

  const { previews, addPreview, clearPreviews } = useImagePreview()

  const handleFileUpload = async (file: File) => {
    try {
      reset()
      clearPreviews()
      await addPreview(file, 'inline')
      await uploadImage(file, userId)
      
      // Auto-fill alt text from filename
      if (!imageOptions.altText) {
        const baseName = file.name.split('.')[0].replace(/[-_]/g, ' ')
        setImageOptions(prev => ({ ...prev, altText: baseName }))
      }
    } catch (error) {
      console.error('Upload error:', error)
    }
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleInsertImage = () => {
    let imageUrl = ''
    
    if (insertMode === 'upload' && result) {
      // Use optimized version based on size preference
      const { original, optimized } = result
      
      if (optimized.length > 0) {
        switch (imageOptions.size) {
          case 'small':
            imageUrl = optimized.find(opt => opt.type === 'thumbnail')?.url || optimized[0].url
            break
          case 'medium':
            imageUrl = optimized.find(opt => opt.type === 'medium')?.url || optimized[1]?.url || optimized[0].url
            break
          case 'large':
            imageUrl = optimized.find(opt => opt.type === 'large')?.url || optimized[optimized.length - 1].url
            break
          case 'original':
          default:
            imageUrl = original.url
        }
      } else {
        imageUrl = original.url
      }
    } else if (insertMode === 'url') {
      imageUrl = urlInput.trim()
    }

    if (!imageUrl) return

    // Generate markdown based on alignment and options
    let markdown = ''
    
    if (imageOptions.alignment === 'center') {
      markdown += '\n<div align="center">\n\n'
    } else if (imageOptions.alignment === 'right') {
      markdown += '\n<div align="right">\n\n'
    }

    // Generate the image markdown
    if (result && insertMode === 'upload') {
      markdown += imageStorage.generateImageMarkdown(result, imageOptions.altText, imageOptions.title)
    } else {
      markdown += `![${imageOptions.altText}](${imageUrl}`
      if (imageOptions.title) {
        markdown += ` "${imageOptions.title}"`
      }
      markdown += ')'
    }

    if (imageOptions.alignment === 'center' || imageOptions.alignment === 'right') {
      markdown += '\n\n</div>\n'
    }

    onImageInsert(markdown)
  }

  const currentImageUrl = result ? (
    result.optimized.length > 0 
      ? result.optimized[result.optimized.length - 1].url
      : result.original.url
  ) : (insertMode === 'url' && urlInput ? urlInput : null)

  const previewUrl = previews['inline'] || (insertMode === 'url' && urlInput ? urlInput : null)

  const canInsert = (insertMode === 'upload' && result) || (insertMode === 'url' && urlInput.trim())

  return (
    <div className={cn('bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 w-full max-w-lg', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
          <ImageIcon className="w-5 h-5 mr-2" />
          Insert Image
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Mode Selector */}
      <div className="flex space-x-2 mb-4">
        <button
          type="button"
          onClick={() => setInsertMode('upload')}
          className={cn(
            'flex-1 px-3 py-2 text-sm rounded-md transition-colors flex items-center justify-center',
            insertMode === 'upload'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
              : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
          )}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setInsertMode('url')}
          className={cn(
            'flex-1 px-3 py-2 text-sm rounded-md transition-colors flex items-center justify-center',
            insertMode === 'url'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
              : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
          )}
        >
          <Link className="w-4 h-4 mr-2" />
          Image URL
        </button>
      </div>

      {/* Upload/URL Input */}
      {insertMode === 'upload' ? (
        <div className="space-y-4 mb-4">
          <div
            {...dragProps}
            className={cn(
              'relative border-2 border-dashed rounded-lg p-4 text-center transition-colors',
              isDragging
                ? 'border-blue-400 bg-blue-50 dark:bg-blue-950'
                : 'border-gray-300 dark:border-gray-600',
              'hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer'
            )}
            onClick={handleFileSelect}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {uploading ? (
              <div className="space-y-2">
                <Loader2 className="w-6 h-6 mx-auto text-blue-600 animate-spin" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Uploading... {progress}%
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="w-6 h-6 mx-auto text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Drop image here or <span className="text-blue-600">browse</span>
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center space-x-2 p-2 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-xs text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-4">
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          />
        </div>
      )}

      {/* Preview */}
      {previewUrl && (
        <div className="mb-4">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full max-h-32 object-cover rounded border"
          />
          {result && (
            <div className="mt-1 text-xs text-green-600 dark:text-green-400 flex items-center">
              <Check className="w-3 h-3 mr-1" />
              Uploaded successfully
            </div>
          )}
        </div>
      )}

      {/* Image Options */}
      <div className="space-y-3 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Alt Text (Required)
          </label>
          <input
            type="text"
            placeholder="Describe the image..."
            value={imageOptions.altText}
            onChange={(e) => setImageOptions(prev => ({ ...prev, altText: e.target.value }))}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title (Optional)
          </label>
          <input
            type="text"
            placeholder="Image title..."
            value={imageOptions.title}
            onChange={(e) => setImageOptions(prev => ({ ...prev, title: e.target.value }))}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Alignment
            </label>
            <select
              value={imageOptions.alignment}
              onChange={(e) => setImageOptions(prev => ({ ...prev, alignment: e.target.value as any }))}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>

          {insertMode === 'upload' && result && result.optimized.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Size
              </label>
              <select
                value={imageOptions.size}
                onChange={(e) => setImageOptions(prev => ({ ...prev, size: e.target.value as any }))}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              >
                <option value="small">Small (300px)</option>
                <option value="medium">Medium (800px)</option>
                <option value="large">Large (1200px)</option>
                <option value="original">Original</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleInsertImage}
          disabled={!canInsert || !imageOptions.altText.trim()}
          className="flex-1 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Insert Image
        </button>
      </div>
    </div>
  )
}