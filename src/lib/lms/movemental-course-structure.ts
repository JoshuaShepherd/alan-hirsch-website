// Utility functions for Movemental course structure (non-server actions)
// This file contains helper functions that don't need server action status

// Import the course data directly
const MOVEMENTAL_MODULES = [
  {
    title: "Movemental Paradigm: Waking the Church to Apostolic Genius",
    order: 1,
    summary: "Understanding the paradigm shift from Christendom to movement, introducing mDNA as the genetic code of apostolic movements",
    learning_objectives: [
      "Identify the difference between institutional and movemental thinking",
      "Recognize Christendom assumptions that limit movement potential",
      "Understand mDNA as the six essential elements of apostolic genius",
      "Apply communitas principles in low-risk team challenges"
    ],
    lessons: [
      {
        title: "The Great Forgetting: Why Movements Die",
        slug: "the-great-forgetting",
        order: 1,
        duration_minutes: 45,
        hirsch_excerpt_md: "\"When we recover apostolic genius, we recover the full church. The full church has the capacity to be the full church that God intends it to be.\" - Alan Hirsch, The Forgotten Ways"
      },
      {
        title: "Apostolic Genius Rediscovered",
        slug: "apostolic-genius-rediscovered", 
        order: 2,
        duration_minutes: 40,
        hirsch_excerpt_md: "\"Apostolic genius is that mysterious quality that seems to catalyze phenomenal Jesus movements... It's what we see in the New Testament church and in the underground church in China.\" - Alan Hirsch"
      },
      {
        title: "mDNA: The Six Elements",
        slug: "mdna-six-elements",
        order: 3, 
        duration_minutes: 50,
        hirsch_excerpt_md: "\"These are the irreducible minimums of what it means to be an apostolic movement. Remove any one of these and you limit the capacity for movement.\" - Alan Hirsch"
      },
      {
        title: "From Institution to Movement",
        slug: "institution-to-movement",
        order: 4,
        duration_minutes: 35,
        hirsch_excerpt_md: "\"We must learn to think like a movement again. This requires a fundamental recalibration of our paradigms, structures, and practices.\" - Alan Hirsch"
      }
    ]
  },
  {
    title: "Jesus is Lord: Allegiance and Organizing Principle",
    order: 2,
    summary: "Establishing Jesus as the organizing principle of movement, moving from mission as program to mission as identity",
    learning_objectives: [
      "Understand Jesus-centered leadership vs. institutional management",
      "Develop allegiance rhythms and rule of life practices",
      "Implement covenanting practices in teams",
      "Create leader rhythms that sustain movement focus"
    ],
    lessons: [
      {
        title: "Mission as Organizing Principle",
        slug: "mission-organizing-principle",
        order: 1,
        duration_minutes: 40,
        hirsch_excerpt_md: "\"When the church is in mission, it is the true church\" - Alan Hirsch, The Forgotten Ways"
      },
      {
        title: "Allegiance Rhythms",
        slug: "allegiance-rhythms",
        order: 2,
        duration_minutes: 45,
        hirsch_excerpt_md: "\"The church must be organized around its mission, not around its internal needs\" - Alan Hirsch"
      },
      {
        title: "Covenanting Practices",
        slug: "covenanting-practices",
        order: 3,
        duration_minutes: 35,
        hirsch_excerpt_md: "\"Covenant creates the relational foundation for sustainable movement\" - Alan Hirsch"
      },
      {
        title: "Leader Rhythms in Movement OS",
        slug: "leader-rhythms-movement-os",
        order: 4,
        duration_minutes: 50,
        hirsch_excerpt_md: "\"Leadership in movements is about creating environments where the movement can thrive\" - Alan Hirsch"
      }
    ]
  },
  {
    title: "APEST as Movement Algorithm",
    order: 3,
    summary: "Implementing the fivefold gifts as the operating system for movement leadership and team formation",
    learning_objectives: [
      "Map APEST profiles for individuals and teams",
      "Facilitate APEST conversations that identify gaps",
      "Design APEST-balanced leadership structures",
      "Apply South Melbourne's functional team model"
    ],
    lessons: [
      {
        title: "APEST Fundamentals",
        slug: "apest-fundamentals",
        order: 1,
        duration_minutes: 45,
        hirsch_excerpt_md: "\"APEST represents the irreducible core of Christian leadership and is fundamental to movement\" - Alan Hirsch, The Permanent Revolution"
      },
      {
        title: "APEST 360 Assessment",
        slug: "apest-360-assessment",
        order: 2,
        duration_minutes: 50,
        hirsch_excerpt_md: "\"Every person has a primary and secondary APEST gifting that must be identified and developed\" - Alan Hirsch"
      },
      {
        title: "Team APEST Matrix",
        slug: "team-apest-matrix",
        order: 3,
        duration_minutes: 40,
        hirsch_excerpt_md: "\"Teams without full APEST representation will be limited in their movement capacity\" - Alan Hirsch"
      },
      {
        title: "Functional Team Implementation",
        slug: "functional-team-implementation",
        order: 4,
        duration_minutes: 45,
        hirsch_excerpt_md: "\"The South Melbourne model shows how APEST can be operationalized in contemporary church\" - Alan Hirsch"
      }
    ]
  },
  {
    title: "Disciple-Making and Reproducibility",
    order: 4,
    summary: "Creating reproducible disciple-making systems that counter consumerism and form 'little Jesuses'",
    learning_objectives: [
      "Launch Life Transformation Groups (LTGs)",
      "Implement Discovery Bible Study patterns",
      "Create oikos mapping systems",
      "Develop coaching cadences for disciple-makers"
    ],
    lessons: [
      {
        title: "From Converts to Disciple-Makers",
        slug: "converts-to-disciple-makers",
        order: 1,
        duration_minutes: 40,
        hirsch_excerpt_md: "\"The goal is not just to make disciples, but to make disciple-makers\" - Alan Hirsch"
      },
      {
        title: "Life Transformation Groups",
        slug: "life-transformation-groups",
        order: 2,
        duration_minutes: 45,
        hirsch_excerpt_md: "\"LTGs create the relational context for transformation to occur\" - Alan Hirsch"
      },
      {
        title: "Discovery Bible Study",
        slug: "discovery-bible-study",
        order: 3,
        duration_minutes: 35,
        hirsch_excerpt_md: "\"Discovery Bible Study democratizes Bible engagement and creates natural multiplication\" - Alan Hirsch"
      },
      {
        title: "Oikos Mapping and Coaching",
        slug: "oikos-mapping-coaching",
        order: 4,
        duration_minutes: 50,
        hirsch_excerpt_md: "\"Every believer has a network of relationships that represents their mission field\" - Alan Hirsch"
      }
    ]
  },
  {
    title: "Missional-Incarnational Impulse",
    order: 5,
    summary: "Moving from attractional to incarnational ministry through everyday mission practices",
    learning_objectives: [
      "Develop neighborhood presence strategies",
      "Create blessing rhythms and practices",
      "Design micro-mission experiments",
      "Build feedback loops for missional learning"
    ],
    lessons: [
      {
        title: "From Attractional to Incarnational",
        slug: "attractional-to-incarnational",
        order: 1,
        duration_minutes: 40,
        hirsch_excerpt_md: "\"Incarnational ministry means taking the gospel to people rather than expecting them to come to us\" - Alan Hirsch"
      },
      {
        title: "Neighborhood Presence Experiments",
        slug: "neighborhood-presence-experiments",
        order: 2,
        duration_minutes: 45,
        hirsch_excerpt_md: "\"Presence is the key to incarnational mission - we must be where people are\" - Alan Hirsch"
      },
      {
        title: "Blessing Rhythms",
        slug: "blessing-rhythms",
        order: 3,
        duration_minutes: 35,
        hirsch_excerpt_md: "\"Blessing is the natural overflow of incarnational presence\" - Alan Hirsch"
      },
      {
        title: "Micro-Mission Labs",
        slug: "micro-mission-labs",
        order: 4,
        duration_minutes: 50,
        hirsch_excerpt_md: "\"Small experiments in mission can lead to movement breakthrough\" - Alan Hirsch"
      }
    ]
  },
  {
    title: "Organic Systems and Movement OS",
    order: 6,
    summary: "Designing living systems that empower every member and create multiplication capacity",
    learning_objectives: [
      "Design open systems with feedback loops",
      "Create leader ladders and apprentice pipelines",
      "Implement organic decision-making processes",
      "Build standard operating rhythms"
    ],
    lessons: [
      {
        title: "Church as Living System",
        slug: "church-living-system",
        order: 1,
        duration_minutes: 45,
        hirsch_excerpt_md: "\"The church is fundamentally an organic system, not a mechanical organization\" - Alan Hirsch"
      },
      {
        title: "Open Systems Design",
        slug: "open-systems-design",
        order: 2,
        duration_minutes: 40,
        hirsch_excerpt_md: "\"Open systems allow for adaptation and growth in ways that closed systems cannot\" - Alan Hirsch"
      },
      {
        title: "Leader Pipelines",
        slug: "leader-pipelines",
        order: 3,
        duration_minutes: 50,
        hirsch_excerpt_md: "\"Every system must be designed to reproduce and develop leaders at every level\" - Alan Hirsch"
      },
      {
        title: "Movement OS Implementation",
        slug: "movement-os-implementation",
        order: 4,
        duration_minutes: 45,
        hirsch_excerpt_md: "\"A movement operating system creates the conditions for spontaneous expansion\" - Alan Hirsch"
      }
    ]
  },
  {
    title: "Communitas Formation",
    order: 7,
    summary: "Creating liminal community that forms through shared mission and adventure",
    learning_objectives: [
      "Design communitas experiences",
      "Facilitate shared mission challenges",
      "Create adventure-based learning",
      "Build community through common purpose"
    ],
    lessons: [
      {
        title: "Understanding Communitas",
        slug: "understanding-communitas",
        order: 1,
        duration_minutes: 40,
        hirsch_excerpt_md: "\"Communitas is the experience of community that emerges from shared mission\" - Alan Hirsch, The Forgotten Ways"
      },
      {
        title: "Liminal Spaces and Experiences",
        slug: "liminal-spaces-experiences",
        order: 2,
        duration_minutes: 45,
        hirsch_excerpt_md: "\"Liminal experiences create the conditions where transformation can occur\" - Alan Hirsch"
      },
      {
        title: "Adventure-Based Learning",
        slug: "adventure-based-learning",
        order: 3,
        duration_minutes: 35,
        hirsch_excerpt_md: "\"Adventure creates the vulnerability necessary for deep community formation\" - Alan Hirsch"
      },
      {
        title: "Mission-Centered Community",
        slug: "mission-centered-community",
        order: 4,
        duration_minutes: 50,
        hirsch_excerpt_md: "\"True Christian community is always formed around shared mission, not just fellowship\" - Alan Hirsch"
      }
    ]
  },
  {
    title: "Multiplication Strategies",
    order: 8,
    summary: "Moving from addition to multiplication through organic reproduction and scaling",
    learning_objectives: [
      "Design multiplication pathways",
      "Create reproduction rhythms",
      "Build scaling strategies",
      "Implement measurement systems"
    ],
    lessons: [
      {
        title: "From Addition to Multiplication",
        slug: "addition-to-multiplication",
        order: 1,
        duration_minutes: 45,
        hirsch_excerpt_md: "\"Multiplication thinking requires a fundamental shift from scarcity to abundance mindset\" - Alan Hirsch"
      },
      {
        title: "Organic Reproduction Patterns",
        slug: "organic-reproduction-patterns",
        order: 2,
        duration_minutes: 40,
        hirsch_excerpt_md: "\"Organic reproduction happens naturally when the right conditions are present\" - Alan Hirsch"
      },
      {
        title: "Scaling Movement Principles",
        slug: "scaling-movement-principles",
        order: 3,
        duration_minutes: 50,
        hirsch_excerpt_md: "\"Scaling requires maintaining movement DNA while adapting to new contexts\" - Alan Hirsch"
      },
      {
        title: "Multiplication Metrics",
        slug: "multiplication-metrics",
        order: 4,
        duration_minutes: 35,
        hirsch_excerpt_md: "\"What gets measured gets multiplied - but we must measure the right things\" - Alan Hirsch"
      }
    ]
  },
  {
    title: "Systems Integration",
    order: 9,
    summary: "Integrating all mDNA elements into a coherent movement operating system",
    learning_objectives: [
      "Integrate all six mDNA elements",
      "Create coherent movement rhythms",
      "Design feedback and learning systems",
      "Build adaptive capacity"
    ],
    lessons: [
      {
        title: "mDNA Integration Framework",
        slug: "mdna-integration-framework",
        order: 1,
        duration_minutes: 45,
        hirsch_excerpt_md: "\"All six elements of mDNA must work together - removing any one limits movement capacity\" - Alan Hirsch"
      },
      {
        title: "Movement Rhythm Design",
        slug: "movement-rhythm-design",
        order: 2,
        duration_minutes: 40,
        hirsch_excerpt_md: "\"Sustainable movements require rhythms that maintain DNA while allowing adaptation\" - Alan Hirsch"
      },
      {
        title: "Feedback and Learning Systems",
        slug: "feedback-learning-systems",
        order: 3,
        duration_minutes: 50,
        hirsch_excerpt_md: "\"Learning systems ensure movements can adapt and evolve without losing their core identity\" - Alan Hirsch"
      },
      {
        title: "Adaptive Capacity Building",
        slug: "adaptive-capacity-building",
        order: 4,
        duration_minutes: 35,
        hirsch_excerpt_md: "\"Movements must be able to adapt to changing circumstances while maintaining their essential nature\" - Alan Hirsch"
      }
    ]
  },
  {
    title: "Movement Sustainability",
    order: 10,
    summary: "Creating lasting change through institutionalization of movement principles",
    learning_objectives: [
      "Design sustainability frameworks",
      "Create succession planning",
      "Build institutional memory",
      "Ensure movement perpetuation"
    ],
    lessons: [
      {
        title: "Institutionalizing Movement DNA",
        slug: "institutionalizing-movement-dna",
        order: 1,
        duration_minutes: 45,
        hirsch_excerpt_md: "\"The challenge is to institutionalize movement principles without killing the movement\" - Alan Hirsch"
      },
      {
        title: "Succession and Leadership Development",
        slug: "succession-leadership-development",
        order: 2,
        duration_minutes: 50,
        hirsch_excerpt_md: "\"Every movement leader must be working themselves out of a job by developing successors\" - Alan Hirsch"
      },
      {
        title: "Building Institutional Memory",
        slug: "building-institutional-memory",
        order: 3,
        duration_minutes: 40,
        hirsch_excerpt_md: "\"Institutional memory preserves movement DNA across generations\" - Alan Hirsch"
      },
      {
        title: "Movement Perpetuation Strategies",
        slug: "movement-perpetuation-strategies",
        order: 4,
        duration_minutes: 35,
        hirsch_excerpt_md: "\"True movements outlast their founders by embedding DNA into systems and culture\" - Alan Hirsch"
      }
    ]
  }
]

// Helper function to get course structure for display
export function getMovementalCourseStructure() {
  return {
    title: "Movemental Thinking for Network Leaders (Advanced)",
    duration: "16 weeks",
    format: "Cohort-based",
    modules: MOVEMENTAL_MODULES.map(module => ({
      title: module.title,
      order: module.order,
      summary: module.summary,
      lessonCount: module.lessons.length,
      learningOutcomes: module.learning_objectives,
      hirschExcerpt: module.lessons[0]?.hirsch_excerpt_md?.replace(/"/g, '').replace(/- Alan Hirsch.*/, '').trim(),
      lessons: module.lessons.map(lesson => ({
        title: lesson.title,
        duration: lesson.duration_minutes,
        slug: lesson.slug,
        type: 'Interactive'
      }))
    }))
  }
}

export { MOVEMENTAL_MODULES }
