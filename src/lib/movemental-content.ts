import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const MOVEMENTAL_CONTENT_DIR = path.join(process.cwd(), 'src/content/movemental')

export interface MovementalLesson {
  slug: string
  title: string
  module: string
  moduleSlug: string
  lessonSlug: string
  order: number
  duration: number
  difficulty: string
  description: string
  learningObjectives: string[]
  keywords: string[]
  content: string
  readingTime: number
}

export interface MovementalModule {
  slug: string
  title: string
  order: number
  lessons: MovementalLesson[]
  totalDuration: number
  lessonCount: number
}

export interface MovementalCourse {
  title: string
  slug: string
  description: string
  modules: MovementalModule[]
  totalLessons: number
  totalDuration: number
}

// Calculate reading time based on content length
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(' ').length
  return Math.ceil(wordCount / wordsPerMinute)
}

// Get all movemental lessons
export function getMovementalLessons(): MovementalLesson[] {
  const lessons: MovementalLesson[] = []

  if (!fs.existsSync(MOVEMENTAL_CONTENT_DIR)) {
    return lessons
  }

  // Get all module directories
  const moduleDirs = fs.readdirSync(MOVEMENTAL_CONTENT_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  for (const moduleDir of moduleDirs) {
    const modulePath = path.join(MOVEMENTAL_CONTENT_DIR, moduleDir)
    
    // Get all lesson files in the module
    const lessonFiles = fs.readdirSync(modulePath)
      .filter(file => file.endsWith('.mdx'))

    for (const lessonFile of lessonFiles) {
      const lessonPath = path.join(modulePath, lessonFile)
      const fileContents = fs.readFileSync(lessonPath, 'utf8')
      const { data, content } = matter(fileContents)

      lessons.push({
        slug: path.basename(lessonFile, '.mdx'),
        title: data.title,
        module: data.module,
        moduleSlug: data.moduleSlug,
        lessonSlug: data.lessonSlug,
        order: data.order,
        duration: data.duration || 30,
        difficulty: data.difficulty || 'intermediate',
        description: data.description || '',
        learningObjectives: data.learningObjectives || [],
        keywords: data.keywords || [],
        content,
        readingTime: data.readingTime || calculateReadingTime(content)
      })
    }
  }

  return lessons.sort((a, b) => {
    // Sort by module order first, then lesson order
    if (a.moduleSlug !== b.moduleSlug) {
      return a.moduleSlug.localeCompare(b.moduleSlug)
    }
    return a.order - b.order
  })
}

// Get lessons for a specific module
export function getLessonsByModule(moduleSlug: string): MovementalLesson[] {
  const allLessons = getMovementalLessons()
  return allLessons
    .filter(lesson => lesson.moduleSlug === moduleSlug)
    .sort((a, b) => a.order - b.order)
}

// Get a specific lesson
export function getMovementalLesson(moduleSlug: string, lessonSlug: string): MovementalLesson | null {
  const moduleLessons = getLessonsByModule(moduleSlug)
  return moduleLessons.find(lesson => lesson.lessonSlug === lessonSlug) || null
}

// Get all modules with their lessons
export function getMovementalModules(): MovementalModule[] {
  const allLessons = getMovementalLessons()
  const moduleMap = new Map<string, MovementalLesson[]>()

  // Group lessons by module
  for (const lesson of allLessons) {
    if (!moduleMap.has(lesson.moduleSlug)) {
      moduleMap.set(lesson.moduleSlug, [])
    }
    moduleMap.get(lesson.moduleSlug)!.push(lesson)
  }

  // Convert to module objects
  const modules: MovementalModule[] = []
  
  for (const [moduleSlug, lessons] of moduleMap.entries()) {
    if (lessons.length > 0) {
      const firstLesson = lessons[0]
      const totalDuration = lessons.reduce((sum, lesson) => sum + lesson.duration, 0)
      
      modules.push({
        slug: moduleSlug,
        title: firstLesson.module,
        order: parseInt(moduleSlug.match(/\d+/)?.[0] || '0'),
        lessons: lessons.sort((a, b) => a.order - b.order),
        totalDuration,
        lessonCount: lessons.length
      })
    }
  }

  return modules.sort((a, b) => a.order - b.order)
}

// Get the complete course structure
export function getMovementalCourse(): MovementalCourse {
  const modules = getMovementalModules()
  const totalLessons = modules.reduce((sum, module) => sum + module.lessonCount, 0)
  const totalDuration = modules.reduce((sum, module) => sum + module.totalDuration, 0)

  return {
    title: 'Movemental Thinking Advanced',
    slug: 'movemental-thinking-advanced',
    description: 'A comprehensive course on developing apostolic genius and building kingdom movements.',
    modules,
    totalLessons,
    totalDuration
  }
}

// Get course introduction
export function getCourseIntroduction(): { title: string; content: string } | null {
  const introPath = path.join(MOVEMENTAL_CONTENT_DIR, 'course-introduction.mdx')
  
  if (!fs.existsSync(introPath)) {
    return null
  }

  const fileContents = fs.readFileSync(introPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    title: data.title,
    content
  }
}

// Search lessons by content
export function searchMovementalLessons(query: string): MovementalLesson[] {
  const allLessons = getMovementalLessons()
  const searchTerm = query.toLowerCase()

  return allLessons.filter(lesson => 
    lesson.title.toLowerCase().includes(searchTerm) ||
    lesson.description.toLowerCase().includes(searchTerm) ||
    lesson.content.toLowerCase().includes(searchTerm) ||
    lesson.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
  )
}

// Get next and previous lessons
export function getLessonNavigation(moduleSlug: string, lessonSlug: string): {
  previous: MovementalLesson | null
  next: MovementalLesson | null
  currentModule: MovementalModule | null
} {
  const modules = getMovementalModules()
  const currentModule = modules.find(m => m.slug === moduleSlug) || null
  
  if (!currentModule) {
    return { previous: null, next: null, currentModule: null }
  }

  const currentLessonIndex = currentModule.lessons.findIndex(l => l.lessonSlug === lessonSlug)
  
  if (currentLessonIndex === -1) {
    return { previous: null, next: null, currentModule }
  }

  const previous = currentLessonIndex > 0 
    ? currentModule.lessons[currentLessonIndex - 1] 
    : null

  const next = currentLessonIndex < currentModule.lessons.length - 1 
    ? currentModule.lessons[currentLessonIndex + 1] 
    : null

  return { previous, next, currentModule }
}
