#!/usr/bin/env node

/**
 * Content Migration Script
 * 
 * Uploads all MDX book content from src/content/books/ to Supabase database.
 * This script reads all MDX files, parses their frontmatter, and inserts the content into the database.
 * 
 * Usage: node scripts/migrate-content.js
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

// Load environment variables
function loadEnvFile() {
  try {
    const envPath = path.join(process.cwd(), '.env.local')
    const envFile = fs.readFileSync(envPath, 'utf8')
    
    envFile.split('\n').forEach(line => {
      const trimmedLine = line.trim()
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=')
        if (key && valueParts.length) {
          let value = valueParts.join('=').trim()
          if ((value.startsWith('"') && value.endsWith('"')) || 
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1)
          }
          process.env[key] = value
        }
      }
    })
  } catch (error) {
    console.error('Could not load .env.local file:', error.message)
  }
}

loadEnvFile()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const BOOKS_DIRECTORY = path.join(process.cwd(), 'src/content/books')

// Helper function to create a slug from a string
function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Helper function to extract reading time (estimate based on content length)
function estimateReadingTime(content) {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

// Get all available books from the file system
function getAvailableBooks() {
  if (!fs.existsSync(BOOKS_DIRECTORY)) {
    return []
  }
  
  return fs.readdirSync(BOOKS_DIRECTORY)
    .filter(item => {
      const fullPath = path.join(BOOKS_DIRECTORY, item)
      return fs.statSync(fullPath).isDirectory()
    })
}

// Parse a book's content from MDX files
function parseBookContent(bookId) {
  const bookPath = path.join(BOOKS_DIRECTORY, bookId)
  
  if (!fs.existsSync(bookPath)) {
    return null
  }

  const files = fs.readdirSync(bookPath)
  const mdxFiles = files.filter(file => file.endsWith('.mdx')).sort()
  
  const chapters = []
  let bookTitle = ''
  let author = ''
  let bookDescription = ''
  let bookKeywords = []

  for (const file of mdxFiles) {
    const filePath = path.join(bookPath, file)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Set book metadata from first chapter
    if (!bookTitle && data.bookTitle) {
      bookTitle = data.bookTitle
      author = data.author || 'Alan Hirsch'
      bookDescription = data.description || `A collection of insights from ${bookTitle}`
      if (data.keywords && Array.isArray(data.keywords)) {
        bookKeywords = data.keywords
      }
    }

    chapters.push({
      title: data.title || `Chapter ${data.chapter || chapters.length + 1}`,
      slug: data.slug || file.replace('.mdx', ''),
      chapterNumber: data.chapter || chapters.length + 1,
      content: content,
      summary: data.description || null,
      keywords: data.keywords || [],
      readingTime: data.readingTime || estimateReadingTime(content),
      difficulty: data.difficulty || 'intermediate',
      audioUrl: data.audioUrl || null,
      videoUrl: data.videoUrl || null
    })
  }

  return {
    title: bookTitle || bookId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    slug: bookId,
    author: author,
    description: bookDescription,
    keywords: bookKeywords,
    totalChapters: chapters.length,
    chapters: chapters
  }
}

// Upload a single book to the database
async function uploadBook(bookData) {
  try {
    console.log(`📖 Processing book: ${bookData.title}`)
    
    // Insert book record
    const { data: bookRecord, error: bookError } = await supabase
      .from('books')
      .insert({
        title: bookData.title,
        slug: bookData.slug,
        author: bookData.author,
        description: bookData.description,
        keywords: bookData.keywords,
        total_chapters: bookData.totalChapters,
        status: 'published'
      })
      .select()
      .single()

    if (bookError) {
      if (bookError.code === '23505') { // Unique constraint violation
        console.log(`   ⚠️  Book already exists: ${bookData.title}`)
        
        // Get existing book
        const { data: existingBook, error: fetchError } = await supabase
          .from('books')
          .select('id')
          .eq('slug', bookData.slug)
          .single()
        
        if (fetchError) {
          throw fetchError
        }
        
        bookRecord = existingBook
      } else {
        throw bookError
      }
    }

    const bookId = bookRecord.id
    console.log(`   ✅ Book record created/found: ${bookId}`)

    // Clear existing chapters for this book (in case of re-upload)
    await supabase
      .from('chapters')
      .delete()
      .eq('book_id', bookId)

    // Insert chapters
    let successCount = 0
    for (const chapter of bookData.chapters) {
      const { error: chapterError } = await supabase
        .from('chapters')
        .insert({
          book_id: bookId,
          title: chapter.title,
          slug: chapter.slug,
          chapter_number: chapter.chapterNumber,
          content: chapter.content,
          summary: chapter.summary,
          keywords: chapter.keywords,
          reading_time: chapter.readingTime,
          difficulty: chapter.difficulty,
          audio_url: chapter.audioUrl,
          video_url: chapter.videoUrl,
          status: 'published'
        })

      if (chapterError) {
        console.error(`   ❌ Failed to insert chapter ${chapter.title}:`, chapterError.message)
      } else {
        successCount++
      }
    }

    console.log(`   📚 Uploaded ${successCount}/${bookData.chapters.length} chapters`)
    return { success: true, chaptersUploaded: successCount }
    
  } catch (error) {
    console.error(`❌ Failed to upload book ${bookData.title}:`, error.message)
    return { success: false, error: error.message }
  }
}

// Main migration function
async function migrateContent() {
  console.log('🚀 Starting content migration to Supabase...\n')
  
  try {
    // Test connection by trying to query the books table
    const { data: testData, error: testError } = await supabase
      .from('books')
      .select('count')
      .limit(1)
    
    if (testError && !testError.message.includes('relation "books" does not exist')) {
      throw new Error(`Connection failed: ${testError.message}`)
    }
    console.log('✅ Connected to Supabase\n')

    // Get all available books
    const availableBooks = getAvailableBooks()
    console.log(`📚 Found ${availableBooks.length} books to migrate:`)
    availableBooks.forEach(book => console.log(`   • ${book}`))
    console.log()

    // Process each book
    let totalBooks = 0
    let successfulBooks = 0
    let totalChapters = 0

    for (const bookId of availableBooks) {
      const bookData = parseBookContent(bookId)
      
      if (!bookData) {
        console.log(`⚠️  Skipping ${bookId} - no valid content found`)
        continue
      }

      totalBooks++
      const result = await uploadBook(bookData)
      
      if (result.success) {
        successfulBooks++
        totalChapters += result.chaptersUploaded
      }
    }

    console.log('\n🎉 Migration completed!')
    console.log(`📊 Results:`)
    console.log(`   • Books processed: ${totalBooks}`)
    console.log(`   • Books uploaded: ${successfulBooks}`)
    console.log(`   • Chapters uploaded: ${totalChapters}`)
    
    if (successfulBooks > 0) {
      console.log('\n💡 Next steps:')
      console.log('   • Visit your Supabase dashboard to verify the data')
      console.log('   • Run npm run db:types to update TypeScript types')
      console.log('   • Test the content at /test-db')
    }

  } catch (error) {
    console.error('💥 Migration failed:', error.message)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  migrateContent()
}

module.exports = { migrateContent, parseBookContent, uploadBook }