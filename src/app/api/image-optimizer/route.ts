import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { fileName, fileData, fileType, userId } = body

    if (!fileName || !fileData || !fileType || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('image-optimizer', {
      body: {
        fileName,
        fileData,
        fileType,
        userId
      }
    })

    if (error) {
      console.error('Edge function error:', error)
      return NextResponse.json(
        { error: 'Image optimization failed', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}