'use server'

import { seedMovementalCourse, createModule, createLesson } from './movemental-actions'
import { MOVEMENTAL_MODULES } from './movemental-course-structure'
import type { Module, Lesson } from '@/types/movemental-lms'

export async function seedCompleteMovementalCourse(): Promise<string> {
  try {
    // Create the main course
    const course = await seedMovementalCourse()
    
    console.log('Created course:', course.title)
    
    // Create all modules and lessons
    for (const moduleData of MOVEMENTAL_MODULES) {
      const { lessons, ...moduleInfo } = moduleData
      
      // Create the module
      const moduleResult = await createModule({
        course_id: course.id,
        ...moduleInfo
      })
      
      console.log(`Created module ${moduleResult.order}: ${moduleResult.title}`)
      
      // Create all lessons for this module
      for (const lessonData of lessons) {
        const lesson = await createLesson({
          module_id: moduleResult.id,
          ...lessonData
        })
        
        console.log(`  Created lesson ${lesson.order}: ${lesson.title}`)
      }
    }
    
    console.log('✅ Complete Movemental course seeded successfully!')
    return course.id
    
  } catch (error) {
    console.error('Error seeding Movemental course:', error)
    throw error
  }
}
