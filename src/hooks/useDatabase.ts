import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()
const supabaseAdmin = createClient() // Note: This won't have admin privileges in client-side code
import type { Database } from '@/types/database.types'
import type { RealtimeChannel } from '@supabase/supabase-js'

// Generic hook for any table operations
export function useDatabase<T extends keyof Database['public']['Tables']>(
  tableName: T
) {
  type TableRow = Database['public']['Tables'][T]['Row']
  type TableInsert = Database['public']['Tables'][T]['Insert'] 
  type TableUpdate = Database['public']['Tables'][T]['Update']

  const [data, setData] = useState<TableRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch data
  const fetchData = useCallback(async (filters?: Record<string, any>) => {
    try {
      setLoading(true)
      setError(null)
      
      let query = supabase.from(tableName).select('*')
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value)
        })
      }
      
      const { data: result, error: fetchError } = await query
      
      if (fetchError) throw fetchError
      setData(result as unknown as TableRow[])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [tableName])

  // Create record
  const create = useCallback(async (newData: TableInsert): Promise<TableRow> => {
    const { data: result, error: insertError } = await supabase
      .from(tableName)
      .insert([newData as any])
      .select()
      .single()

    if (insertError) throw insertError
    return result as unknown as TableRow
  }, [tableName])

  // Update record
  const update = useCallback(async (id: string, updates: TableUpdate): Promise<TableRow> => {
    const { data: result, error: updateError } = await supabase
      .from(tableName)
      .update(updates as any)
      .eq('id' as any, id)
      .select()
      .single()

    if (updateError) throw updateError
    return result as unknown as TableRow
  }, [tableName])

  // Delete record
  const remove = useCallback(async (id: string): Promise<void> => {
    const { error: deleteError } = await supabase
      .from(tableName)
      .delete()
      .eq('id' as any, id)

    if (deleteError) throw deleteError
  }, [tableName])

  return {
    data,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    refetch: () => fetchData()
  }
}

// Hook for real-time subscriptions
export function useRealtimeSubscription<T extends keyof Database['public']['Tables']>(
  tableName: T,
  filters?: Record<string, any>
) {
  const [data, setData] = useState<Database['public']['Tables'][T]['Row'][]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let channel: RealtimeChannel

    const setupSubscription = async () => {
      try {
        setLoading(true)
        setError(null)

        // Initial fetch
        let query = supabase.from(tableName).select('*')
        
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            query = query.eq(key, value)
          })
        }

        const { data: initialData, error: fetchError } = await query
        if (fetchError) throw fetchError
        
        setData(initialData as unknown as Database['public']['Tables'][T]['Row'][])

        // Set up real-time subscription
        channel = supabase
          .channel(`${tableName}-changes`)
          .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: tableName,
            ...(filters && { filter: Object.entries(filters).map(([k, v]) => `${k}=eq.${v}`).join(',') })
          }, (payload) => {
            console.log(`${tableName} changed:`, payload)
            
            setData(currentData => {
              const newData = [...currentData]
              const record = payload.new as Database['public']['Tables'][T]['Row']
              const oldRecord = payload.old as Database['public']['Tables'][T]['Row']

              switch (payload.eventType) {
                case 'INSERT':
                  return [...newData, record]
                case 'UPDATE':
                  return newData.map(item => 
                    (item as any).id === (record as any).id ? record : item
                  )
                case 'DELETE':
                  return newData.filter(item => 
                    (item as any).id !== (oldRecord as any).id
                  )
                default:
                  return newData
              }
            })
          })
          .subscribe()

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    setupSubscription()

    return () => {
      if (channel) {
        channel.unsubscribe()
      }
    }
  }, [tableName, JSON.stringify(filters)])

  return { data, loading, error }
}

// Hook for authentication state
export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return {
    user,
    loading,
    signIn: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      return data
    },
    signUp: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      return data
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    }
  }
}

// Hook for file uploads to Supabase Storage
export function useFileUpload(bucket: string = 'assets') {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const uploadFile = useCallback(async (
    file: File, 
    path?: string,
    options?: { 
      onProgress?: (progress: number) => void
      upsert?: boolean 
    }
  ) => {
    try {
      setUploading(true)
      setUploadProgress(0)

      const filePath = path || `${Date.now()}-${file.name}`
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          upsert: options?.upsert ?? false
        })

      if (error) throw error

      // Track progress manually if needed
      if (options?.onProgress) {
        options.onProgress(100)
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      return {
        path: data.path,
        publicUrl,
        fullPath: data.fullPath
      }
    } catch (error) {
      throw error
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }, [bucket])

  const deleteFile = useCallback(async (path: string) => {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])
    
    if (error) throw error
  }, [bucket])

  return {
    uploadFile,
    deleteFile,
    uploading,
    uploadProgress
  }
}

// Hook for paginated data
export function usePaginatedData<T extends keyof Database['public']['Tables']>(
  tableName: T,
  itemsPerPage: number = 10,
  filters?: Record<string, any>
) {
  const [data, setData] = useState<Database['public']['Tables'][T]['Row'][]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const fetchPage = useCallback(async (page: number = 1) => {
    try {
      setLoading(true)
      setError(null)

      const from = (page - 1) * itemsPerPage
      const to = from + itemsPerPage - 1

      let query = supabase
        .from(tableName)
        .select('*', { count: 'exact' })
        .range(from, to)

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value)
        })
      }

      const { data: result, error: fetchError, count } = await query

      if (fetchError) throw fetchError

      setData(result as unknown as Database['public']['Tables'][T]['Row'][])
      setTotalCount(count || 0)
      setCurrentPage(page)
      setHasMore((count || 0) > page * itemsPerPage)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [tableName, itemsPerPage, JSON.stringify(filters)])

  const nextPage = useCallback(() => {
    if (hasMore) {
      fetchPage(currentPage + 1)
    }
  }, [currentPage, hasMore, fetchPage])

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      fetchPage(currentPage - 1)
    }
  }, [currentPage, fetchPage])

  useEffect(() => {
    fetchPage(1)
  }, [fetchPage])

  return {
    data,
    loading,
    error,
    currentPage,
    totalCount,
    hasMore,
    nextPage,
    prevPage,
    refetch: () => fetchPage(currentPage),
    totalPages: Math.ceil(totalCount / itemsPerPage)
  }
}