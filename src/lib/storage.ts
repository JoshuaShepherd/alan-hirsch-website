import { createClient } from '@/lib/supabase/client'

export interface ImageUploadResult {
  original: {
    path: string
    url: string
    size: number
  }
  optimized: {
    type: string
    path: string
    url: string
    width: number
    format: string
  }[]
}

export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

export class ImageStorageService {
  private supabase = createClient()

  /**
   * Upload an image file with automatic optimization
   */
  async uploadImage(
    file: File,
    userId: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<ImageUploadResult> {
    try {
      // Validate file type
      if (!this.isValidImageType(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG, GIF, WebP, and SVG are allowed.')
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size must be less than 10MB.')
      }

      // Convert file to base64 for Edge Function
      const base64Data = await this.fileToBase64(file)
      
      // Report upload start
      onProgress?.({ loaded: 0, total: 100, percentage: 0 })

      // Call the Edge Function for optimization
      const response = await fetch('/api/image-optimizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await this.supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          fileName: file.name,
          fileData: base64Data,
          fileType: file.type,
          userId: userId
        })
      })

      onProgress?.({ loaded: 50, total: 100, percentage: 50 })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const result: ImageUploadResult = await response.json()
      
      onProgress?.({ loaded: 100, total: 100, percentage: 100 })
      
      return result
    } catch (error) {
      console.error('Image upload error:', error)
      throw error
    }
  }

  /**
   * Upload image directly to storage (fallback method)
   */
  async uploadImageDirect(
    file: File,
    userId: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<{ url: string; path: string }> {
    try {
      if (!this.isValidImageType(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG, GIF, WebP, and SVG are allowed.')
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size must be less than 10MB.')
      }

      // Generate unique filename
      const fileExtension = file.name.split('.').pop()
      const baseFileName = file.name.replace(/\.[^/.]+$/, '')
      const timestamp = Date.now()
      const uniqueFileName = `${baseFileName}-${timestamp}.${fileExtension}`
      const filePath = `${userId}/${uniqueFileName}`

      onProgress?.({ loaded: 0, total: 100, percentage: 0 })

      // Upload to Supabase Storage
      const { data, error } = await this.supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        throw new Error(`Upload failed: ${error.message}`)
      }

      onProgress?.({ loaded: 80, total: 100, percentage: 80 })

      // Get public URL
      const { data: urlData } = this.supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath)

      onProgress?.({ loaded: 100, total: 100, percentage: 100 })

      return {
        url: urlData.publicUrl,
        path: filePath
      }
    } catch (error) {
      console.error('Direct upload error:', error)
      throw error
    }
  }

  /**
   * Delete an image from storage
   */
  async deleteImage(path: string): Promise<void> {
    try {
      const { error } = await this.supabase.storage
        .from('blog-images')
        .remove([path])

      if (error) {
        throw new Error(`Delete failed: ${error.message}`)
      }
    } catch (error) {
      console.error('Image delete error:', error)
      throw error
    }
  }

  /**
   * Get optimized image URL for responsive display
   */
  getOptimizedImageUrl(baseUrl: string, width?: number): string {
    // In a production environment, you might use Supabase's image transformation
    // or a CDN with query parameters for resizing
    if (width) {
      return `${baseUrl}?width=${width}&quality=85&format=webp`
    }
    return baseUrl
  }

  /**
   * Generate markdown for image embedding
   */
  generateImageMarkdown(
    result: ImageUploadResult,
    altText: string = '',
    title?: string
  ): string {
    const { original, optimized } = result
    
    // Use the largest optimized version if available, otherwise original
    const imageUrl = optimized.length > 0 
      ? optimized[optimized.length - 1].url 
      : original.url

    let markdown = `![${altText}](${imageUrl}`
    if (title) {
      markdown += ` "${title}"`
    }
    markdown += ')'

    return markdown
  }

  /**
   * Generate responsive image HTML for advanced use cases
   */
  generateResponsiveImageHtml(
    result: ImageUploadResult,
    altText: string = '',
    className: string = ''
  ): string {
    const { original, optimized } = result

    if (optimized.length === 0) {
      return `<img src="${original.url}" alt="${altText}" class="${className}" />`
    }

    // Create srcset for responsive images
    const srcset = optimized
      .map(opt => `${opt.url} ${opt.width}w`)
      .join(', ')

    const sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'

    return `<img 
      src="${original.url}" 
      srcset="${srcset}"
      sizes="${sizes}"
      alt="${altText}" 
      class="${className}"
      loading="lazy"
    />`
  }

  private isValidImageType(type: string): boolean {
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml'
    ]
    return validTypes.includes(type)
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Remove data URL prefix to get just the base64 data
          const base64 = reader.result.split(',')[1]
          resolve(base64)
        } else {
          reject(new Error('Failed to convert file to base64'))
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
  }
}

// Singleton instance
export const imageStorage = new ImageStorageService()