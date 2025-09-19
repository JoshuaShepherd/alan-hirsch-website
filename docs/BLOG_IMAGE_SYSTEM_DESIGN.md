# Blog Image Handling System Design

## Current State Analysis

### What We Have
- Blog posts render markdown content ✅
- Featured image display support in blog post template ✅
- Basic image component in markdown renderer ✅

### What's Missing
- ❌ Image upload interface
- ❌ Image optimization pipeline
- ❌ Easy image embedding in editor
- ❌ Image storage management
- ❌ Responsive image serving

## Proposed Architecture

### 1. Image Storage Strategy
```
Supabase Storage Buckets:
├── blog-images/
│   ├── originals/          # Raw uploaded files
│   ├── optimized/          # Processed versions
│   │   ├── thumbnails/     # 300x200 previews
│   │   ├── medium/         # 800x600 content images
│   │   ├── large/          # 1200x800 hero images
│   │   └── webp/           # WebP versions for performance
│   └── featured/           # Featured images for posts
```

### 2. Upload & Optimization Flow
```
User Upload → Edge Function → Multiple Formats → Storage → CDN
     ↓
1. Original saved to /originals/
2. Edge function triggers optimization
3. Generate multiple sizes/formats
4. Save optimized versions
5. Return URLs for use
```

### 3. Integration Points

#### A. Featured Image Upload (Admin)
- Drag & drop interface in blog editor
- Automatic optimization to 1200x630 (social media optimal)
- Preview with crop/resize tools
- Auto-generate alt text suggestions

#### B. Inline Image Embedding (Content)
- Rich text editor integration
- Image browser/picker
- Drag & drop from file system
- Automatic markdown insertion
- Responsive sizing options

#### C. Image Optimization (Edge Function)
- Sharp.js for image processing
- Multiple format generation (JPEG, WebP, AVIF)
- Responsive breakpoint generation
- Compression optimization
- Metadata preservation

## Technical Implementation Plan

### Phase 1: Storage Setup
```sql
-- Supabase Storage Bucket
CREATE BUCKET blog_images WITH (
  PUBLIC = true,
  FILE_SIZE_LIMIT = 10485760, -- 10MB
  ALLOWED_MIME_TYPES = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Database table for image metadata
CREATE TABLE blog_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  original_url TEXT NOT NULL,
  optimized_urls JSONB, -- URLs for different sizes
  alt_text TEXT,
  caption TEXT,
  file_size INTEGER,
  dimensions JSONB, -- {width, height}
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);
```

### Phase 2: Edge Function for Optimization
```typescript
// supabase/functions/optimize-image/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Sharp from "https://deno.land/x/sharp@0.32.6/mod.ts"

const SIZES = {
  thumbnail: { width: 300, height: 200 },
  medium: { width: 800, height: 600 },
  large: { width: 1200, height: 800 },
  featured: { width: 1200, height: 630 }
}

serve(async (req) => {
  const { originalPath, targetSizes } = await req.json()
  
  // Download original image
  const originalImage = await downloadFromStorage(originalPath)
  
  const optimizedUrls = {}
  
  for (const [sizeName, dimensions] of Object.entries(SIZES)) {
    if (targetSizes.includes(sizeName)) {
      // Generate JPEG version
      const jpegBuffer = await Sharp(originalImage)
        .resize(dimensions.width, dimensions.height, { fit: 'cover' })
        .jpeg({ quality: 85 })
        .toBuffer()
      
      // Generate WebP version
      const webpBuffer = await Sharp(originalImage)
        .resize(dimensions.width, dimensions.height, { fit: 'cover' })
        .webp({ quality: 80 })
        .toBuffer()
      
      // Upload optimized versions
      const jpegPath = `optimized/${sizeName}/${filename}.jpg`
      const webpPath = `optimized/${sizeName}/${filename}.webp`
      
      await uploadToStorage(jpegPath, jpegBuffer)
      await uploadToStorage(webpPath, webpBuffer)
      
      optimizedUrls[sizeName] = {
        jpeg: getPublicUrl(jpegPath),
        webp: getPublicUrl(webpPath)
      }
    }
  }
  
  return Response.json({ optimizedUrls })
})
```

### Phase 3: Upload Components

#### A. Featured Image Uploader
```typescript
// src/components/FeaturedImageUploader.tsx
'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Crop } from 'lucide-react'

export function FeaturedImageUploader({ 
  value, 
  onChange,
  onUpload 
}: {
  value?: string
  onChange: (url: string) => void
  onUpload: (file: File) => Promise<string>
}) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(value)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setUploading(true)
    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      // Upload and optimize
      const optimizedUrl = await onUpload(file)
      onChange(optimizedUrl)
      
      // Clean up preview
      URL.revokeObjectURL(previewUrl)
      setPreview(optimizedUrl)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }, [onUpload, onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Featured Image
      </label>
      
      {preview ? (
        <div className="relative">
          <img 
            src={preview} 
            alt="Featured image preview"
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
          />
          <button
            onClick={() => {
              setPreview(undefined)
              onChange('')
            }}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} disabled={uploading} />
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          {uploading ? (
            <p className="text-gray-600">Uploading and optimizing...</p>
          ) : isDragActive ? (
            <p className="text-blue-600">Drop the image here...</p>
          ) : (
            <div>
              <p className="text-gray-600 mb-2">
                Drag & drop an image here, or click to select
              </p>
              <p className="text-sm text-gray-500">
                JPEG, PNG, WebP up to 10MB
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
```

#### B. Inline Image Browser
```typescript
// src/components/ImageBrowser.tsx
'use client'

import { useState, useEffect } from 'react'
import { Search, Upload, Grid, List } from 'lucide-react'

export function ImageBrowser({ 
  onSelect,
  onUpload 
}: {
  onSelect: (imageUrl: string, altText: string) => void
  onUpload: (file: File) => Promise<{ url: string; altText: string }>
}) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Load images from database
  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    // Fetch from blog_images table
    const { data } = await supabase
      .from('blog_images')
      .select('*')
      .order('created_at', { ascending: false })
    
    setImages(data || [])
    setLoading(false)
  }

  const handleUpload = async (file: File) => {
    const result = await onUpload(file)
    await loadImages() // Refresh list
    return result
  }

  const filteredImages = images.filter(img => 
    img.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.alt_text?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Image Library</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Upload Zone */}
      <FeaturedImageUploader onUpload={handleUpload} />

      {/* Image Grid */}
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-3 gap-4' 
          : 'space-y-2'
        }
      `}>
        {filteredImages.map((image) => (
          <div
            key={image.id}
            onClick={() => onSelect(image.optimized_urls.medium.webp, image.alt_text)}
            className="cursor-pointer hover:opacity-75 transition-opacity"
          >
            <img
              src={image.optimized_urls.thumbnail.webp}
              alt={image.alt_text}
              className="w-full h-20 object-cover rounded border"
            />
            <p className="text-xs text-gray-600 mt-1 truncate">
              {image.filename}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Phase 4: Rich Text Editor Integration

#### Enhanced Markdown Editor with Image Support
```typescript
// src/components/MarkdownEditor.tsx
'use client'

import { useState } from 'react'
import { Bold, Italic, Image, Link } from 'lucide-react'
import { ImageBrowser } from './ImageBrowser'

export function MarkdownEditor({ 
  value, 
  onChange 
}: {
  value: string
  onChange: (value: string) => void
}) {
  const [showImageBrowser, setShowImageBrowser] = useState(false)
  const [cursorPosition, setCursorPosition] = useState(0)

  const insertImage = (imageUrl: string, altText: string) => {
    const beforeCursor = value.substring(0, cursorPosition)
    const afterCursor = value.substring(cursorPosition)
    
    const imageMarkdown = `![${altText}](${imageUrl})\n\n`
    const newValue = beforeCursor + imageMarkdown + afterCursor
    
    onChange(newValue)
    setShowImageBrowser(false)
  }

  const uploadImage = async (file: File) => {
    // Upload to storage
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData
    })
    
    const { url, altText } = await response.json()
    return { url, altText }
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b">
        <button
          onClick={() => setShowImageBrowser(true)}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
        >
          <Image className="w-4 h-4" />
          Insert Image
        </button>
        {/* Other toolbar buttons */}
      </div>

      {/* Editor */}
      <textarea
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setCursorPosition(e.target.selectionStart)
        }}
        onSelect={(e) => setCursorPosition(e.target.selectionStart)}
        className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm"
        placeholder="Write your blog post in Markdown..."
      />

      {/* Image Browser Modal */}
      {showImageBrowser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <ImageBrowser
              onSelect={insertImage}
              onUpload={uploadImage}
            />
            <button
              onClick={() => setShowImageBrowser(false)}
              className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
```

### Phase 5: API Routes

#### Image Upload API
```typescript
// src/app/api/upload-image/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const supabase = await createClient()
    
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    
    // Upload original
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('blog_images')
      .upload(`originals/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) throw uploadError

    // Trigger optimization
    const { data: optimizeData } = await supabase.functions.invoke('optimize-image', {
      body: {
        originalPath: uploadData.path,
        targetSizes: ['thumbnail', 'medium', 'large']
      }
    })

    // Save metadata to database
    const { data: imageRecord } = await supabase
      .from('blog_images')
      .insert({
        filename: file.name,
        original_url: supabase.storage.from('blog_images').getPublicUrl(uploadData.path).data.publicUrl,
        optimized_urls: optimizeData.optimizedUrls,
        file_size: file.size,
        dimensions: { width: 0, height: 0 }, // TODO: Get from Sharp
        alt_text: generateAltText(file.name) // TODO: Implement AI alt text
      })
      .select()
      .single()

    return NextResponse.json({
      url: optimizeData.optimizedUrls.medium.webp,
      altText: imageRecord.alt_text
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

function generateAltText(filename: string): string {
  // Basic alt text generation from filename
  return filename
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[-_]/g, ' ')    // Replace dashes/underscores with spaces
    .replace(/\b\w/g, l => l.toUpperCase()) // Title case
}
```

## User Experience Flow

### For Content Creators
1. **Writing**: Use markdown editor with image button
2. **Upload**: Drag & drop or browse from library
3. **Optimization**: Automatic background processing
4. **Insert**: Image URL automatically inserted in markdown
5. **Preview**: Real-time preview with optimized images

### For Readers
1. **Fast Loading**: WebP images with JPEG fallback
2. **Responsive**: Appropriate sizes for device
3. **Progressive**: Low-res placeholder → high-res
4. **Accessible**: Proper alt text and captions

## Performance Considerations

### Image Optimization
- **WebP Support**: 25-35% smaller than JPEG
- **Responsive Images**: Serve appropriate sizes
- **Lazy Loading**: Load images as they come into view
- **CDN Caching**: Supabase Storage with global CDN

### Storage Costs
- **Original**: Keep one high-quality version
- **Optimized**: Generate 3-4 sizes max
- **Cleanup**: Remove unused images periodically
- **Compression**: Balance quality vs file size

This comprehensive image system would provide:
- ✅ Easy upload interface
- ✅ Automatic optimization
- ✅ Multiple format support
- ✅ Responsive serving
- ✅ SEO-friendly alt text
- ✅ User-friendly editing experience