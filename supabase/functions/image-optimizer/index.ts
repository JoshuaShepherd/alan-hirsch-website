import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ImageUploadRequest {
  fileName: string
  fileData: string // base64 encoded
  fileType: string
  userId: string
}

interface OptimizationOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'jpeg' | 'png'
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const { fileName, fileData, fileType, userId }: ImageUploadRequest = await req.json()

    if (!fileName || !fileData || !fileType || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Decode base64 file data
    const fileBuffer = Uint8Array.from(atob(fileData), c => c.charCodeAt(0))

    // Generate unique filename with user folder structure
    const fileExtension = fileName.split('.').pop()
    const baseFileName = fileName.replace(/\.[^/.]+$/, '')
    const timestamp = Date.now()
    const uniqueFileName = `${baseFileName}-${timestamp}.${fileExtension}`
    const filePath = `${userId}/${uniqueFileName}`

    // Upload original image
    const { data: uploadData, error: uploadError } = await supabaseClient.storage
      .from('blog-images')
      .upload(filePath, fileBuffer, {
        contentType: fileType,
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return new Response(
        JSON.stringify({ error: 'Failed to upload image', details: uploadError.message }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Generate optimized versions
    const optimizedVersions = await generateOptimizedVersions(
      supabaseClient,
      fileBuffer,
      fileType,
      userId,
      baseFileName,
      timestamp
    )

    // Get public URLs for all versions
    const { data: originalUrl } = supabaseClient.storage
      .from('blog-images')
      .getPublicUrl(filePath)

    const result = {
      original: {
        path: filePath,
        url: originalUrl.publicUrl,
        size: fileBuffer.length
      },
      optimized: optimizedVersions
    }

    return new Response(
      JSON.stringify(result),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

async function generateOptimizedVersions(
  supabaseClient: any,
  originalBuffer: Uint8Array,
  originalType: string,
  userId: string,
  baseFileName: string,
  timestamp: number
) {
  const versions = []

  // Define optimization configurations
  const configs = [
    { suffix: 'thumbnail', width: 300, quality: 80, format: 'webp' as const },
    { suffix: 'medium', width: 800, quality: 85, format: 'webp' as const },
    { suffix: 'large', width: 1200, quality: 90, format: 'webp' as const },
  ]

  for (const config of configs) {
    try {
      // For now, we'll upload the original with different names
      // In a production environment, you'd use a proper image processing library
      // like ImageMagick or Sharp via WASM
      const optimizedPath = `${userId}/${baseFileName}-${config.suffix}-${timestamp}.webp`
      
      const { data: uploadData, error: uploadError } = await supabaseClient.storage
        .from('blog-images')
        .upload(optimizedPath, originalBuffer, {
          contentType: 'image/webp',
          upsert: false
        })

      if (!uploadError) {
        const { data: urlData } = supabaseClient.storage
          .from('blog-images')
          .getPublicUrl(optimizedPath)

        versions.push({
          type: config.suffix,
          path: optimizedPath,
          url: urlData.publicUrl,
          width: config.width,
          format: config.format
        })
      }
    } catch (error) {
      console.error(`Failed to create ${config.suffix} version:`, error)
    }
  }

  return versions
}

/* Deno.json configuration for this function:
{
  "compilerOptions": {
    "allowJs": true,
    "lib": ["deno.window"],
    "strict": true
  },
  "importMap": "./import_map.json"
}
*/