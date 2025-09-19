'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  BookOpen, 
  Users, 
  Lightbulb, 
  Target,
  Calendar,
  Video,
  Mic,
  MessageSquare
} from 'lucide-react'

interface ContentTemplate {
  id: string
  name: string
  description: string
  category: 'Blog Post' | 'Resource' | 'Book Chapter' | 'Partner Content'
  icon: React.ReactNode
  structure: string
  seoKeywords: string[]
  estimatedReadingTime: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

interface ContentTemplatesProps {
  onSelectTemplate: (template: ContentTemplate) => void
}

const contentTemplates: ContentTemplate[] = [
  {
    id: 'missional-article',
    name: 'Missional Church Article',
    description: 'Deep-dive into missional church principles and practices',
    category: 'Blog Post',
    icon: <Target className="w-5 h-5" />,
    structure: `# [Article Title]

## Introduction
Brief overview of the missional principle you'll explore...

## The Challenge
What problem or opportunity does this address in church life?

## Biblical Foundation
Scripture that supports this principle...

## Practical Application
### For Church Leaders
- Specific action item 1
- Specific action item 2

### For Communities
- Implementation strategy 1
- Implementation strategy 2

## Case Study
Real-world example of this principle in action...

## Next Steps
What should readers do after reading this?

## Resources for Further Study
- Related books
- Partner organizations
- Assessment tools`,
    seoKeywords: ['missional church', 'church renewal', 'apostolic movement'],
    estimatedReadingTime: 8,
    difficulty: 'intermediate'
  },
  {
    id: 'apest-framework',
    name: 'APEST Framework Guide',
    description: 'Comprehensive guide to implementing five-fold ministry',
    category: 'Resource',
    icon: <Users className="w-5 h-5" />,
    structure: `# Understanding [APEST Gift]: A Practical Guide

## Introduction to [Gift Name]
What this gift means in the five-fold ministry...

## Biblical Foundation
Key scriptures and theological backing...

## Characteristics of [Gift Name]
### Strengths
- Core strength 1
- Core strength 2
- Core strength 3

### Challenges
- Common challenge 1
- Common challenge 2

## How to Recognize This Gift
### In Yourself
Signs you might have this gift...

### In Others
How to identify this gift in team members...

## Practical Development
### Personal Growth Exercises
- Exercise 1
- Exercise 2

### Team Integration Strategies
- Strategy 1
- Strategy 2

## Assessment Tools
Link to APEST assessment and interpretation...

## Partner Organizations
Who can help you develop this gift further...`,
    seoKeywords: ['APEST', 'five-fold ministry', 'ministry gifts', 'leadership development'],
    estimatedReadingTime: 12,
    difficulty: 'beginner'
  },
  {
    id: 'book-chapter',
    name: 'Book Chapter Analysis',
    description: 'Deep analysis of concepts from Alan\'s books',
    category: 'Book Chapter',
    icon: <BookOpen className="w-5 h-5" />,
    structure: `# Chapter [X]: [Chapter Title] - Analysis and Application

## Chapter Overview
Summary of key concepts from this chapter...

## Key Insights
### Primary Insight 1
Explanation and implications...

### Primary Insight 2
Explanation and implications...

### Primary Insight 3
Explanation and implications...

## Historical Context
How this concept fits into church history...

## Contemporary Application
### For Individual Leaders
- Personal application 1
- Personal application 2

### For Church Communities
- Community implementation 1
- Community implementation 2

### For Movements
- Movement-level application 1
- Movement-level application 2

## Discussion Questions
1. Question for personal reflection
2. Question for team discussion
3. Question for community dialogue

## Practical Exercises
### Week 1: Assessment
- Activity to assess current state

### Week 2: Implementation
- First step toward change

### Week 3: Evaluation
- Measuring progress and impact

## Related Resources
- Other relevant chapters
- External resources
- Partner organization connections

## Assessment Integration
How this connects to missional assessments...`,
    seoKeywords: ['church transformation', 'missional leadership', 'apostolic genius'],
    estimatedReadingTime: 15,
    difficulty: 'advanced'
  },
  {
    id: 'partner-spotlight',
    name: 'Partner Organization Spotlight',
    description: 'Feature partner organizations and their work',
    category: 'Partner Content',
    icon: <Lightbulb className="w-5 h-5" />,
    structure: `# Partner Spotlight: [Organization Name]

## Organization Overview
Brief introduction to the partner organization...

## Mission Alignment
How their mission aligns with missional church renewal...

## Key Programs and Services
### Program 1
Description and impact...

### Program 2
Description and impact...

### Program 3
Description and impact...

## Success Stories
### Story 1: [Title]
Real impact example...

### Story 2: [Title]
Another transformation story...

## Leadership Profile
Feature key leaders and their background...

## Resources Available
### For Individuals
- Resource 1
- Resource 2

### For Churches
- Resource 1
- Resource 2

### For Networks
- Resource 1
- Resource 2

## How to Connect
- Website and contact information
- Upcoming events and opportunities
- Application processes

## Integration with Alan's Work
How this partner enhances the broader missional movement...

## Call to Action
Specific next steps for readers interested in connecting...`,
    seoKeywords: ['church networks', 'missional partnerships', 'church renewal'],
    estimatedReadingTime: 10,
    difficulty: 'beginner'
  },
  {
    id: 'video-companion',
    name: 'Video Content Companion',
    description: 'Written content to accompany video teachings',
    category: 'Blog Post',
    icon: <Video className="w-5 h-5" />,
    structure: `# [Video Title]: Key Insights and Application

## Video Overview
Brief summary of the video content...

## Watch the Video
[Embedded video player or link]

## Key Takeaways
### Main Point 1
Expanded explanation beyond what's in the video...

### Main Point 2
Additional context and application...

### Main Point 3
Practical implementation strategies...

## Discussion Starters
Questions to use with your team or community:

1. Reflection question 1
2. Application question 2
3. Challenge question 3

## Dive Deeper
### Recommended Reading
- Book chapters that expand on this topic
- Related articles and resources

### Assessment Tools
Relevant assessments that connect to this content...

### Community Discussion
Link to forum discussion or comments section...

## Transcript Highlights
Key quotes from the video for easy reference...

## Next Steps
### For Individuals
- Personal action item 1
- Personal action item 2

### For Leaders
- Leadership application 1
- Leadership application 2

### For Communities
- Community implementation 1
- Community implementation 2

## Related Content
- Other videos in this series
- Connected blog posts
- Partner organization resources`,
    seoKeywords: ['video teaching', 'church leadership', 'practical ministry'],
    estimatedReadingTime: 6,
    difficulty: 'intermediate'
  },
  {
    id: 'podcast-episode',
    name: 'Podcast Episode Guide',
    description: 'Written companion for podcast episodes',
    category: 'Blog Post',
    icon: <Mic className="w-5 h-5" />,
    structure: `# Podcast Episode [X]: [Episode Title]

## Episode Overview
What you'll learn in this episode...

## Listen to the Episode
[Audio player embed]

## Episode Guests
### [Guest Name]
Bio and background...

## Key Conversation Points
### Topic 1: [Timestamp]
Summary and additional insights...

### Topic 2: [Timestamp]
Summary and additional insights...

### Topic 3: [Timestamp]
Summary and additional insights...

## Practical Applications
### Immediate Actions
Things you can implement this week...

### Long-term Development
Areas for ongoing growth and development...

## Resources Mentioned
- Books referenced in the conversation
- Organizations discussed
- Tools and assessments mentioned

## Reflection Questions
1. Personal reflection question
2. Team discussion question
3. Community application question

## Continue the Conversation
- Ways to engage with the content
- Community discussion opportunities
- Follow-up resources

## Transcript
[Full episode transcript for accessibility and SEO]

## Related Episodes
- Previous episodes on similar topics
- Upcoming episodes to watch for

## Connect with Guests
How to learn more from episode guests...`,
    seoKeywords: ['podcast', 'church leadership conversation', 'ministry insights'],
    estimatedReadingTime: 4,
    difficulty: 'beginner'
  }
]

export function ContentTemplates({ onSelectTemplate }: ContentTemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(contentTemplates.map(t => t.category)))]

  const filteredTemplates = selectedCategory === 'all' 
    ? contentTemplates 
    : contentTemplates.filter(t => t.category === selectedCategory)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Content Templates
        </CardTitle>
        <CardDescription>
          Choose a template to jumpstart your content creation
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Templates' : category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredTemplates.map(template => (
            <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      {template.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {template.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(template.difficulty)}>
                      {template.difficulty}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {template.estimatedReadingTime} min read
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">SEO Keywords:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.seoKeywords.slice(0, 3).map(keyword => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => onSelectTemplate(template)}
                  className="w-full"
                  size="sm"
                >
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}