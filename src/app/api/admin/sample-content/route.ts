import { NextRequest, NextResponse } from 'next/server'
import { lmsSupabase } from '@/lib/lms/supabase'

// Sample course data
const SAMPLE_COURSES = [
  {
    title: 'The Forgotten Ways: An Introduction to Missional Church',
    slug: 'forgotten-ways-intro',
    level: 'foundation' as const,
    summary: 'Discover the original ways of the early church and how they can transform your ministry today.',
    description: 'This foundational course explores the core concepts from Alan Hirsch\'s groundbreaking work "The Forgotten Ways," examining how the early church\'s approaches to mission, community, and discipleship can revolutionize modern ministry.',
    outcomes_json: [
      'Understand the six elements of Apostolic Genius',
      'Apply mDNA principles to your ministry context',
      'Develop a missional mindset and culture',
      'Create sustainable discipleship movements'
    ],
    duration_weeks: 8,
    status: 'published' as const,
    price_cents: 14900, // $149
  },
  {
    title: '5Q Leadership: Activating the Fivefold Ministry',
    slug: '5q-leadership-mastery',
    level: 'intermediate' as const,
    summary: 'Master the five leadership intelligences that Jesus gave to the church.',
    description: 'An in-depth exploration of the Apostolic, Prophetic, Evangelistic, Shepherding, and Teaching (APEST) intelligence types and how they work together to create mature, multiplying communities.',
    outcomes_json: [
      'Identify your primary and secondary APEST callings',
      'Build balanced leadership teams',
      'Develop all five intelligences in your context',
      'Create systems that activate everyone\'s gifts'
    ],
    duration_weeks: 12,
    status: 'published' as const,
    price_cents: 19900, // $199
  },
  {
    title: 'Movement Multiplication Masterclass',
    slug: 'movement-multiplication',
    level: 'advanced' as const,
    summary: 'Advanced strategies for catalyzing and sustaining movement dynamics.',
    description: 'This masterclass dives deep into the practical mechanics of movement multiplication, covering everything from network theory to viral coefficients in spiritual contexts.',
    outcomes_json: [
      'Design movement DNA for your context',
      'Implement viral growth strategies',
      'Create adaptive learning systems',
      'Measure and optimize movement health'
    ],
    duration_weeks: 16,
    status: 'published' as const,
    price_cents: 29900, // $299
  }
]

const SAMPLE_MODULES = [
  // The Forgotten Ways modules
  {
    courseSlug: 'forgotten-ways-intro',
    modules: [
      {
        order: 1,
        title: 'Introduction to Apostolic Genius',
        summary: 'Understanding the core concepts that drive exponential church growth',
        learning_objectives: [
          'Define Apostolic Genius and its six elements',
          'Recognize patterns in movement history',
          'Assess current ministry paradigms'
        ],
        framework_content: 'The Apostolic Genius framework provides a lens for understanding how movements naturally emerge and multiply.',
        practice_description: 'Conduct an assessment of your current ministry context using the Apostolic Genius framework.',
        system_description: 'Establish baseline metrics for measuring movement health in your community.'
      },
      {
        order: 2,
        title: 'mDNA and Movement Intelligence',
        summary: 'Exploring the genetic codes that define healthy missional communities',
        learning_objectives: [
          'Understand mDNA (missional DNA) concepts',
          'Identify core missional behaviors',
          'Design context-appropriate mDNA'
        ],
        framework_content: 'Missional DNA represents the irreducible minimum elements needed for authentic Christian community.',
        practice_description: 'Map the current DNA of your community and identify gaps or strengths.',
        system_description: 'Create systems for embedding mDNA into all community practices and structures.'
      }
    ]
  },
  // 5Q Leadership modules
  {
    courseSlug: '5q-leadership-mastery',
    modules: [
      {
        order: 1,
        title: 'Understanding APEST Intelligence Types',
        summary: 'Deep dive into the five leadership intelligences Jesus gave the church',
        learning_objectives: [
          'Distinguish between the five APEST types',
          'Recognize APEST manifestations in Scripture',
          'Identify your own APEST profile'
        ],
        framework_content: 'APEST represents the foundational leadership intelligences that create mature, multiplying communities.',
        practice_description: 'Complete comprehensive APEST assessment and create personal development plan.',
        system_description: 'Design recruitment and development systems that identify and activate APEST gifts.'
      },
      {
        order: 2,
        title: 'Building Balanced Leadership Teams',
        summary: 'Creating synergy between different APEST types for maximum impact',
        learning_objectives: [
          'Assess current team APEST balance',
          'Recruit complementary team members',
          'Facilitate healthy APEST tensions'
        ],
        framework_content: 'Balanced APEST teams create the conditions for sustainable growth and health.',
        practice_description: 'Audit current leadership team and create plan for better APEST representation.',
        system_description: 'Implement team formation processes that prioritize APEST balance.'
      }
    ]
  }
]

export async function POST() {
  try {
    // Check if we're in development mode
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'Sample content can only be created in development mode' },
        { status: 403 }
      )
    }

    const results = []

    // Create courses
    for (const courseData of SAMPLE_COURSES) {
      try {
        const { data: course, error: courseError } = await lmsSupabase
          .schema('lms')
          .from('courses')
          .upsert(courseData, { onConflict: 'slug' })
          .select()
          .single()

        if (courseError) {
          results.push({
            type: 'course',
            title: courseData.title,
            success: false,
            error: courseError.message
          })
          continue
        }

        // Create modules for this course
        const moduleData = SAMPLE_MODULES.find(m => m.courseSlug === courseData.slug)
        if (moduleData) {
          for (const module of moduleData.modules) {
            const { error: moduleError } = await lmsSupabase
              .schema('lms')
              .from('modules')
              .upsert({
                course_id: course.id,
                ...module
              }, { onConflict: 'course_id,order' })

            if (moduleError) {
              console.error('Module creation error:', moduleError)
            }
          }
        }

        results.push({
          type: 'course',
          title: courseData.title,
          slug: courseData.slug,
          success: true,
          id: course.id
        })

      } catch (error) {
        results.push({
          type: 'course',
          title: courseData.title,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    // Create sample organization if it doesn't exist
    const { data: existingOrg } = await lmsSupabase
      .schema('lms')
      .from('organizations')
      .select('id')
      .eq('slug', 'test-organization')
      .single()

    if (!existingOrg) {
      await lmsSupabase
        .schema('lms')
        .from('organizations')
        .insert({
          name: 'Test Organization',
          slug: 'test-organization',
          region: 'North America',
          metadata: {},
          theme_json: {}
        })
    }

    return NextResponse.json({
      message: 'Sample content creation completed',
      results,
      totalItems: results.length,
      successfulItems: results.filter(r => r.success).length,
      failedItems: results.filter(r => !r.success).length
    })

  } catch (error) {
    console.error('Error creating sample content:', error)
    return NextResponse.json(
      { error: 'Failed to create sample content' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // List existing courses
    const { data: courses } = await lmsSupabase
      .schema('lms')
      .from('courses')
      .select(`
        id,
        title,
        slug,
        level,
        status,
        duration_weeks,
        price_cents,
        created_at,
        modules(id, title, order)
      `)
      .order('created_at', { ascending: false })

    return NextResponse.json({
      message: 'Sample content found',
      courses: courses || [],
      count: courses?.length || 0
    })

  } catch (error) {
    console.error('Error fetching sample content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sample content' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    // Delete all sample content (development only)
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'Sample content can only be deleted in development mode' },
        { status: 403 }
      )
    }

    // Delete in reverse order due to foreign key constraints
    await lmsSupabase.schema('lms').from('modules').delete().neq('id', '')
    await lmsSupabase.schema('lms').from('courses').delete().neq('id', '')

    return NextResponse.json({
      message: 'Sample content deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting sample content:', error)
    return NextResponse.json(
      { error: 'Failed to delete sample content' },
      { status: 500 }
    )
  }
}
