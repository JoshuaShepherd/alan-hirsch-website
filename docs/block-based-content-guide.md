# Block-Based Content: Complete Implementation Guide

**Understanding How Block-Based Content Works and How to Implement It Effectively**

---

## **What Block-Based Content Actually Means**

**Block-based content is a modular approach to content creation where each piece of content is composed of individual, reusable components (blocks) that can be arranged, edited, and styled independently.** Think of it like building with LEGO blocks—each block has a specific purpose (paragraph, heading, image, video, quote), but you can combine them in infinite ways to create complex, rich content experiences.

Popular examples include:
- **WordPress Gutenberg**: Each paragraph, heading, and image is a separate block
- **Notion**: Pages are built from text, image, database, and embed blocks  
- **Medium**: Articles use text, image, quote, and embed blocks
- **Ghost**: Posts combine markdown, image, gallery, and bookmark blocks

For your platform, block-based content enables **flexible content creation, easy repurposing across platforms, AI-assisted content generation, and sophisticated learning experiences** that go beyond simple text articles.

## **Why Block-Based Content is Essential for Your Platform**

### **1. Flexible Content Creation for Different Media Types**

Your platform needs to handle diverse content types for theological education:

```json
// Example: A comprehensive lesson on missional leadership
{
  "lessonId": "missional-leadership-101",
  "title": "Understanding Missional Leadership",
  "blocks": [
    {
      "id": "intro-1",
      "type": "paragraph",
      "content": "Missional leadership represents a fundamental shift in how we understand church leadership in the 21st century.",
      "metadata": { "emphasis": "introduction" }
    },
    {
      "id": "definition-1", 
      "type": "definition",
      "content": {
        "term": "Missional Leadership",
        "definition": "Leadership that flows from God's mission (missio Dei) and focuses on sending rather than gathering."
      }
    },
    {
      "id": "video-1",
      "type": "video",
      "content": {
        "url": "https://vimeo.com/123456789",
        "duration": 480,
        "transcript": "In this video, Alan Hirsch explains...",
        "chapters": [
          { "time": 0, "title": "Introduction to Missio Dei" },
          { "time": 120, "title": "Leadership vs Management" },
          { "time": 300, "title": "Practical Applications" }
        ]
      }
    },
    {
      "id": "assessment-1",
      "type": "interactive_assessment",
      "content": {
        "question": "Which APEST gifting best describes your natural leadership tendency?",
        "type": "single_choice",
        "options": [
          { "id": "A", "text": "Apostolic - pioneering new initiatives" },
          { "id": "P", "text": "Prophetic - discerning God's direction" },
          { "id": "E", "text": "Evangelistic - reaching the lost" },
          { "id": "S", "text": "Shepherding - caring for people" },
          { "id": "T", "text": "Teaching - explaining biblical truth" }
        ]
      }
    },
    {
      "id": "reflection-1",
      "type": "reflection_prompt",
      "content": {
        "prompt": "Think of a leader who embodies missional principles. What specific behaviors or decisions demonstrate their missional orientation?",
        "wordLimit": 200,
        "private": true
      }
    }
  ]
}
```

### **2. AI-Assisted Content Creation and Optimization**

Block-based structure enables sophisticated AI assistance:

```typescript
// AI can suggest specific block improvements
interface ContentBlock {
  id: string
  type: BlockType
  content: any
  metadata?: {
    aiSuggestions?: {
      clarity?: string
      engagement?: string
      seoOptimization?: string
    }
    performance?: {
      avgReadTime: number
      engagementScore: number
      completionRate: number
    }
  }
}

// AI can generate entire content flows
const generateLessonFlow = async (topic: string, audienceLevel: string) => {
  const blocks = [
    await generateBlock('introduction', { topic, audienceLevel }),
    await generateBlock('definition', { term: extractKeyTerm(topic) }),
    await generateBlock('biblical_foundation', { topic }),
    await generateBlock('practical_application', { topic, audienceLevel }),
    await generateBlock('reflection_questions', { topic }),
    await generateBlock('next_steps', { topic, audienceLevel })
  ]
  return blocks
}
```

### **3. Multi-Platform Content Repurposing**

Single content can be transformed for different platforms:

```typescript
// Transform lesson blocks for different output formats
const repurposeContent = (blocks: ContentBlock[], format: 'blog' | 'email' | 'social' | 'pdf') => {
  switch (format) {
    case 'blog':
      return blocks.filter(b => b.type !== 'interactive_assessment').map(formatForWeb)
    
    case 'email':
      return blocks
        .filter(b => ['paragraph', 'heading', 'quote'].includes(b.type))
        .map(formatForEmail)
    
    case 'social':
      return extractKeyQuotes(blocks).map(formatForSocial)
    
    case 'pdf':
      return blocks.map(formatForPrint)
  }
}
```

## **Block Types for Theological Education Platform**

### **1. Core Content Blocks**

```typescript
interface ParagraphBlock {
  type: 'paragraph'
  content: string
  metadata?: {
    emphasis?: 'introduction' | 'conclusion' | 'key_point'
    difficulty?: 'foundational' | 'intermediate' | 'advanced'
  }
}

interface HeadingBlock {
  type: 'heading'
  content: string
  level: 1 | 2 | 3 | 4 | 5 | 6
  metadata?: {
    section?: 'introduction' | 'main_content' | 'application' | 'conclusion'
  }
}

interface QuoteBlock {
  type: 'quote'
  content: {
    text: string
    author?: string
    source?: string
    citation?: string
  }
  metadata?: {
    emphasis?: 'scripture' | 'theological' | 'practical' | 'historical'
  }
}

interface ListBlock {
  type: 'list'
  content: {
    style: 'ordered' | 'unordered'
    items: Array<{
      text: string
      subItems?: string[]
    }>
  }
}
```

### **2. Media and Interactive Blocks**

```typescript
interface ImageBlock {
  type: 'image'
  content: {
    url: string
    alt: string
    caption?: string
    width?: number
    height?: number
  }
  metadata?: {
    purpose?: 'illustration' | 'diagram' | 'portrait' | 'historical'
  }
}

interface VideoBlock {
  type: 'video'
  content: {
    url: string
    thumbnail?: string
    duration: number
    transcript?: string
    chapters?: Array<{
      time: number
      title: string
      description?: string
    }>
  }
  metadata?: {
    source?: 'vimeo' | 'youtube' | 'custom'
    quality?: '720p' | '1080p' | '4k'
  }
}

interface AudioBlock {
  type: 'audio'
  content: {
    url: string
    duration: number
    transcript?: string
    chapters?: Array<{
      time: number
      title: string
    }>
  }
  metadata?: {
    type?: 'lecture' | 'interview' | 'sermon' | 'discussion'
  }
}

interface EmbedBlock {
  type: 'embed'
  content: {
    url: string
    type: 'youtube' | 'vimeo' | 'spotify' | 'twitter' | 'custom'
    embedCode?: string
  }
}
```

### **3. Educational and Assessment Blocks**

```typescript
interface DefinitionBlock {
  type: 'definition'
  content: {
    term: string
    definition: string
    pronunciation?: string
    etymology?: string
    relatedTerms?: string[]
  }
}

interface CalloutBlock {
  type: 'callout'
  content: {
    text: string
    style: 'info' | 'warning' | 'tip' | 'important' | 'question'
  }
}

interface ScriptureBlock {
  type: 'scripture'
  content: {
    text: string
    reference: string
    version: string
    context?: string
  }
  metadata?: {
    theme?: string
    relevance?: string
  }
}

interface InteractiveAssessmentBlock {
  type: 'interactive_assessment'
  content: {
    question: string
    type: 'single_choice' | 'multiple_choice' | 'true_false' | 'short_answer' | 'essay'
    options?: Array<{
      id: string
      text: string
      correct?: boolean
      explanation?: string
    }>
    correctAnswer?: string
    explanation?: string
    points?: number
  }
}

interface ReflectionPromptBlock {
  type: 'reflection_prompt'
  content: {
    prompt: string
    guidelines?: string[]
    wordLimit?: number
    timeLimit?: number
    private: boolean
  }
}

interface DiscussionBlock {
  type: 'discussion'
  content: {
    topic: string
    prompt: string
    guidelines?: string[]
    moderationRequired?: boolean
  }
}
```

### **4. Specialized Theological Blocks**

```typescript
interface APESTAssessmentBlock {
  type: 'apest_assessment'
  content: {
    questions: Array<{
      id: string
      text: string
      giftingCategory: 'A' | 'P' | 'E' | 'S' | 'T'
      weight: number
    }>
    scoring: {
      methodology: string
      resultCategories: string[]
    }
  }
}

interface CaseStudyBlock {
  type: 'case_study'
  content: {
    title: string
    scenario: string
    context: string
    questions: string[]
    learningObjectives: string[]
    suggestedDiscussion?: string[]
  }
}

interface TimelineBlock {
  type: 'timeline'
  content: {
    title: string
    events: Array<{
      date: string
      title: string
      description: string
      significance?: string
    }>
  }
}

interface ComparisionTableBlock {
  type: 'comparison_table'
  content: {
    title: string
    columns: string[]
    rows: Array<{
      label: string
      values: string[]
    }>
  }
}
```

## **Database Schema for Block-Based Content**

### **1. Core Content Structure**

```sql
-- Content items contain collections of blocks
CREATE TABLE content.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  author_id UUID NOT NULL REFERENCES auth.users(id),
  status content_status DEFAULT 'draft',
  content_blocks JSONB DEFAULT '[]'::JSONB,
  metadata JSONB DEFAULT '{}'::JSONB,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Block templates for reusable content patterns
CREATE TABLE content.block_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  block_type TEXT NOT NULL,
  default_content JSONB NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Block usage analytics
CREATE TABLE content.block_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL REFERENCES content.items(id),
  block_id TEXT NOT NULL,  -- Block ID within the content
  block_type TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  event_type TEXT NOT NULL, -- 'view', 'interact', 'complete', 'skip'
  event_data JSONB DEFAULT '{}',
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **2. Block Validation and Schema**

```sql
-- JSON schema validation for different block types
CREATE OR REPLACE FUNCTION validate_block_content(block_type TEXT, content JSONB)
RETURNS BOOLEAN AS $$
BEGIN
  CASE block_type
    WHEN 'paragraph' THEN
      RETURN content ? 'text' AND jsonb_typeof(content->'text') = 'string';
      
    WHEN 'heading' THEN
      RETURN content ? 'text' AND content ? 'level' AND
             jsonb_typeof(content->'text') = 'string' AND
             (content->>'level')::int BETWEEN 1 AND 6;
             
    WHEN 'image' THEN
      RETURN content ? 'url' AND content ? 'alt' AND
             jsonb_typeof(content->'url') = 'string' AND
             jsonb_typeof(content->'alt') = 'string';
             
    WHEN 'video' THEN
      RETURN content ? 'url' AND content ? 'duration' AND
             jsonb_typeof(content->'url') = 'string' AND
             jsonb_typeof(content->'duration') = 'number';
             
    WHEN 'interactive_assessment' THEN
      RETURN content ? 'question' AND content ? 'type' AND
             jsonb_typeof(content->'question') = 'string';
             
    ELSE
      RETURN TRUE; -- Allow unknown block types for flexibility
  END CASE;
END;
$$ LANGUAGE plpgsql;

-- Trigger to validate block content on insert/update
CREATE OR REPLACE FUNCTION validate_content_blocks() RETURNS TRIGGER AS $$
DECLARE
  block JSONB;
BEGIN
  -- Validate each block in the content_blocks array
  FOR block IN SELECT jsonb_array_elements(NEW.content_blocks)
  LOOP
    IF NOT validate_block_content(block->>'type', block->'content') THEN
      RAISE EXCEPTION 'Invalid content for block type: %', block->>'type';
    END IF;
  END LOOP;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_blocks_trigger
  BEFORE INSERT OR UPDATE ON content.items
  FOR EACH ROW EXECUTE FUNCTION validate_content_blocks();
```

## **Frontend Implementation: Block Editor**

### **1. Block Editor Architecture**

```typescript
// components/block-editor/BlockEditor.tsx
import { useState, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { BlockComponent } from './BlockComponent'
import { BlockToolbar } from './BlockToolbar'

interface BlockEditorProps {
  initialBlocks: ContentBlock[]
  onChange: (blocks: ContentBlock[]) => void
  readOnly?: boolean
}

export function BlockEditor({ initialBlocks, onChange, readOnly = false }: BlockEditorProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(initialBlocks)
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)

  const handleBlockChange = useCallback((blockId: string, updatedBlock: ContentBlock) => {
    const newBlocks = blocks.map(block => 
      block.id === blockId ? updatedBlock : block
    )
    setBlocks(newBlocks)
    onChange(newBlocks)
  }, [blocks, onChange])

  const handleAddBlock = useCallback((afterBlockId: string, blockType: BlockType) => {
    const newBlock: ContentBlock = {
      id: generateId(),
      type: blockType,
      content: getDefaultContent(blockType),
      metadata: {}
    }
    
    const afterIndex = blocks.findIndex(block => block.id === afterBlockId)
    const newBlocks = [
      ...blocks.slice(0, afterIndex + 1),
      newBlock,
      ...blocks.slice(afterIndex + 1)
    ]
    
    setBlocks(newBlocks)
    onChange(newBlocks)
    setSelectedBlockId(newBlock.id)
  }, [blocks, onChange])

  const handleDeleteBlock = useCallback((blockId: string) => {
    const newBlocks = blocks.filter(block => block.id !== blockId)
    setBlocks(newBlocks)
    onChange(newBlocks)
    setSelectedBlockId(null)
  }, [blocks, onChange])

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const newBlocks = Array.from(blocks)
    const [reorderedBlock] = newBlocks.splice(result.source.index, 1)
    newBlocks.splice(result.destination.index, 0, reorderedBlock)

    setBlocks(newBlocks)
    onChange(newBlocks)
  }

  if (readOnly) {
    return (
      <div className="block-content">
        {blocks.map((block, index) => (
          <BlockComponent
            key={block.id}
            block={block}
            index={index}
            readOnly={true}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="block-editor">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="blocks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`block-wrapper ${selectedBlockId === block.id ? 'selected' : ''}`}
                      onClick={() => setSelectedBlockId(block.id)}
                    >
                      <div {...provided.dragHandleProps} className="block-drag-handle">
                        ⋮⋮
                      </div>
                      
                      <BlockComponent
                        block={block}
                        index={index}
                        onChange={(updatedBlock) => handleBlockChange(block.id, updatedBlock)}
                        onAddBlock={(blockType) => handleAddBlock(block.id, blockType)}
                        onDelete={() => handleDeleteBlock(block.id)}
                        isSelected={selectedBlockId === block.id}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {selectedBlockId && (
        <BlockToolbar
          blockId={selectedBlockId}
          block={blocks.find(b => b.id === selectedBlockId)!}
          onUpdate={(updatedBlock) => handleBlockChange(selectedBlockId, updatedBlock)}
        />
      )}
    </div>
  )
}
```

### **2. Individual Block Components**

```typescript
// components/block-editor/blocks/ParagraphBlock.tsx
interface ParagraphBlockProps {
  block: ParagraphBlock
  onChange?: (block: ParagraphBlock) => void
  readOnly?: boolean
}

export function ParagraphBlock({ block, onChange, readOnly = false }: ParagraphBlockProps) {
  const [content, setContent] = useState(block.content)

  const handleChange = (newContent: string) => {
    setContent(newContent)
    onChange?.({
      ...block,
      content: newContent
    })
  }

  if (readOnly) {
    return (
      <p 
        className={`paragraph-block ${block.metadata?.emphasis || ''}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  return (
    <div className="paragraph-block-editor">
      <TiptapEditor
        content={content}
        onChange={handleChange}
        placeholder="Start writing..."
        extensions={[
          Bold,
          Italic,
          Link,
          // Theological formatting
          ScriptureReference,
          GreekHebrew
        ]}
      />
    </div>
  )
}

// components/block-editor/blocks/InteractiveAssessmentBlock.tsx
interface InteractiveAssessmentBlockProps {
  block: InteractiveAssessmentBlock
  onChange?: (block: InteractiveAssessmentBlock) => void
  readOnly?: boolean
}

export function InteractiveAssessmentBlock({ 
  block, 
  onChange, 
  readOnly = false 
}: InteractiveAssessmentBlockProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId)
  }

  const handleSubmit = () => {
    setShowResults(true)
    // Track assessment interaction
    trackBlockInteraction(block.id, 'assessment_submit', {
      selectedAnswer,
      correct: block.content.options?.find(o => o.id === selectedAnswer)?.correct
    })
  }

  if (readOnly) {
    return (
      <div className="assessment-block">
        <h3 className="assessment-question">{block.content.question}</h3>
        
        <div className="assessment-options">
          {block.content.options?.map((option) => (
            <label key={option.id} className="assessment-option">
              <input
                type={block.content.type === 'single_choice' ? 'radio' : 'checkbox'}
                name={block.id}
                value={option.id}
                checked={selectedAnswer === option.id}
                onChange={() => handleAnswerSelect(option.id)}
              />
              <span>{option.text}</span>
            </label>
          ))}
        </div>

        {!showResults && (
          <button 
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="assessment-submit"
          >
            Submit Answer
          </button>
        )}

        {showResults && (
          <div className="assessment-results">
            <div className={`result ${
              block.content.options?.find(o => o.id === selectedAnswer)?.correct 
                ? 'correct' : 'incorrect'
            }`}>
              {block.content.options?.find(o => o.id === selectedAnswer)?.correct 
                ? '✓ Correct!' : '✗ Not quite right'}
            </div>
            
            {block.content.explanation && (
              <div className="explanation">
                <h4>Explanation:</h4>
                <p>{block.content.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // Edit mode for content creators
  return (
    <div className="assessment-block-editor">
      <input
        type="text"
        value={block.content.question}
        onChange={(e) => onChange?.({
          ...block,
          content: { ...block.content, question: e.target.value }
        })}
        placeholder="Enter your question..."
        className="assessment-question-input"
      />

      <div className="assessment-options-editor">
        {block.content.options?.map((option, index) => (
          <div key={option.id} className="option-editor">
            <input
              type="text"
              value={option.text}
              onChange={(e) => updateOption(index, 'text', e.target.value)}
              placeholder="Option text..."
            />
            <label>
              <input
                type="checkbox"
                checked={option.correct}
                onChange={(e) => updateOption(index, 'correct', e.target.checked)}
              />
              Correct
            </label>
          </div>
        ))}
        
        <button onClick={addOption}>Add Option</button>
      </div>
    </div>
  )
}
```

### **3. Block Toolbar and Controls**

```typescript
// components/block-editor/BlockToolbar.tsx
interface BlockToolbarProps {
  blockId: string
  block: ContentBlock
  onUpdate: (block: ContentBlock) => void
}

export function BlockToolbar({ blockId, block, onUpdate }: BlockToolbarProps) {
  const [aiSuggestions, setAISuggestions] = useState<AISuggestion[]>([])

  const requestAISuggestions = async () => {
    const suggestions = await generateBlockSuggestions(block)
    setAISuggestions(suggestions)
  }

  const applyAISuggestion = (suggestion: AISuggestion) => {
    const updatedBlock = applySuggestionToBlock(block, suggestion)
    onUpdate(updatedBlock)
  }

  return (
    <div className="block-toolbar">
      <div className="toolbar-section">
        <h4>Block Settings</h4>
        
        {/* Common block settings */}
        <div className="setting-group">
          <label>Block Type</label>
          <select
            value={block.type}
            onChange={(e) => convertBlockType(block, e.target.value as BlockType)}
          >
            <option value="paragraph">Paragraph</option>
            <option value="heading">Heading</option>
            <option value="quote">Quote</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="interactive_assessment">Assessment</option>
          </select>
        </div>

        {/* Block-specific settings */}
        {block.type === 'paragraph' && (
          <div className="setting-group">
            <label>Emphasis</label>
            <select
              value={block.metadata?.emphasis || ''}
              onChange={(e) => onUpdate({
                ...block,
                metadata: { ...block.metadata, emphasis: e.target.value }
              })}
            >
              <option value="">None</option>
              <option value="introduction">Introduction</option>
              <option value="key_point">Key Point</option>
              <option value="conclusion">Conclusion</option>
            </select>
          </div>
        )}
      </div>

      <div className="toolbar-section">
        <h4>AI Assistant</h4>
        
        <button onClick={requestAISuggestions} className="ai-button">
          Get AI Suggestions
        </button>
        
        {aiSuggestions.length > 0 && (
          <div className="ai-suggestions">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="ai-suggestion">
                <p>{suggestion.description}</p>
                <button onClick={() => applyAISuggestion(suggestion)}>
                  Apply
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="toolbar-section">
        <h4>Analytics</h4>
        
        <div className="block-metrics">
          <div className="metric">
            <span className="metric-label">Engagement</span>
            <span className="metric-value">
              {block.metadata?.performance?.engagementScore || 0}%
            </span>
          </div>
          
          <div className="metric">
            <span className="metric-label">Avg. Read Time</span>
            <span className="metric-value">
              {block.metadata?.performance?.avgReadTime || 0}s
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
```

## **Advanced Block Features**

### **1. AI-Powered Block Generation**

```typescript
// services/ai-block-service.ts
export class AIBlockService {
  async generateBlockFromPrompt(prompt: string, context: ContentContext): Promise<ContentBlock[]> {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for theological content creation. 
                   Generate content blocks based on the user's prompt. 
                   Consider the theological depth, practical application, and learning objectives.
                   Return structured JSON blocks.`
        },
        {
          role: 'user',
          content: `Create content blocks for: ${prompt}
                   Context: ${JSON.stringify(context)}
                   
                   Include a mix of:
                   - Explanatory text
                   - Scripture references
                   - Practical applications
                   - Interactive elements`
        }
      ],
      functions: [
        {
          name: 'generate_content_blocks',
          description: 'Generate structured content blocks',
          parameters: {
            type: 'object',
            properties: {
              blocks: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    type: { type: 'string' },
                    content: { type: 'object' },
                    metadata: { type: 'object' }
                  }
                }
              }
            }
          }
        }
      ]
    })

    return response.choices[0].message.function_call?.arguments 
      ? JSON.parse(response.choices[0].message.function_call.arguments).blocks
      : []
  }

  async optimizeBlock(block: ContentBlock, optimization: 'clarity' | 'engagement' | 'seo'): Promise<ContentBlock> {
    const optimizationPrompts = {
      clarity: 'Improve the clarity and theological accuracy of this content',
      engagement: 'Make this content more engaging and interactive for learners',
      seo: 'Optimize this content for search engines while maintaining theological integrity'
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are optimizing theological educational content. ${optimizationPrompts[optimization]}.`
        },
        {
          role: 'user',
          content: `Optimize this block: ${JSON.stringify(block)}`
        }
      ]
    })

    return JSON.parse(response.choices[0].message.content || '{}')
  }
}
```

### **2. Block Performance Analytics**

```typescript
// hooks/use-block-analytics.ts
export function useBlockAnalytics(contentId: string) {
  return useQuery({
    queryKey: ['block-analytics', contentId],
    queryFn: async () => {
      const { data } = await supabase
        .from('block_analytics')
        .select('*')
        .eq('content_id', contentId)

      // Aggregate analytics by block
      const blockStats = data?.reduce((acc, event) => {
        if (!acc[event.block_id]) {
          acc[event.block_id] = {
            block_id: event.block_id,
            block_type: event.block_type,
            views: 0,
            interactions: 0,
            completions: 0,
            avg_time_spent: 0,
            engagement_score: 0
          }
        }

        const stats = acc[event.block_id]
        
        switch (event.event_type) {
          case 'view':
            stats.views++
            break
          case 'interact':
            stats.interactions++
            break
          case 'complete':
            stats.completions++
            break
        }

        if (event.event_data?.time_spent) {
          stats.avg_time_spent = (stats.avg_time_spent + event.event_data.time_spent) / 2
        }

        return acc
      }, {} as Record<string, BlockAnalytics>)

      // Calculate engagement scores
      Object.values(blockStats || {}).forEach(stats => {
        const interactionRate = stats.interactions / Math.max(stats.views, 1)
        const completionRate = stats.completions / Math.max(stats.views, 1)
        stats.engagement_score = (interactionRate * 0.4 + completionRate * 0.6) * 100
      })

      return blockStats
    }
  })
}

// Track block interactions
export function trackBlockInteraction(
  blockId: string, 
  eventType: string, 
  eventData?: any
) {
  return supabase
    .from('block_analytics')
    .insert({
      content_id: getCurrentContentId(),
      block_id: blockId,
      block_type: getBlockType(blockId),
      user_id: getCurrentUserId(),
      session_id: getSessionId(),
      event_type: eventType,
      event_data: eventData
    })
}
```

### **3. Block Templates and Reusability**

```typescript
// components/block-editor/BlockTemplates.tsx
export function BlockTemplates({ onSelectTemplate }: { onSelectTemplate: (blocks: ContentBlock[]) => void }) {
  const { data: templates } = useQuery({
    queryKey: ['block-templates'],
    queryFn: async () => {
      const { data } = await supabase
        .from('block_templates')
        .select('*')
        .order('created_at', { ascending: false })
      return data
    }
  })

  const predefinedTemplates = [
    {
      name: 'Lesson Introduction',
      description: 'Standard introduction pattern for theological lessons',
      blocks: [
        { type: 'heading', content: { text: 'Lesson Title', level: 1 } },
        { type: 'paragraph', content: 'Engaging introduction paragraph...' },
        { type: 'definition', content: { term: 'Key Term', definition: 'Definition...' } },
        { type: 'scripture', content: { text: 'Scripture text...', reference: 'Reference' } }
      ]
    },
    {
      name: 'Case Study',
      description: 'Interactive case study with reflection questions',
      blocks: [
        { type: 'heading', content: { text: 'Case Study: [Title]', level: 2 } },
        { type: 'case_study', content: { title: '', scenario: '', context: '', questions: [] } },
        { type: 'reflection_prompt', content: { prompt: 'Reflect on...', private: true } },
        { type: 'discussion', content: { topic: '', prompt: '' } }
      ]
    },
    {
      name: 'APEST Assessment',
      description: 'Complete APEST gifting assessment flow',
      blocks: [
        { type: 'heading', content: { text: 'Discover Your APEST Gifting', level: 1 } },
        { type: 'paragraph', content: 'This assessment will help you...' },
        { type: 'apest_assessment', content: { questions: [], scoring: {} } },
        { type: 'reflection_prompt', content: { prompt: 'Based on your results...', private: false } }
      ]
    }
  ]

  return (
    <div className="block-templates">
      <h3>Content Templates</h3>
      
      <div className="template-categories">
        <div className="category">
          <h4>Predefined Templates</h4>
          {predefinedTemplates.map((template, index) => (
            <div key={index} className="template-card">
              <h5>{template.name}</h5>
              <p>{template.description}</p>
              <button onClick={() => onSelectTemplate(template.blocks)}>
                Use Template
              </button>
            </div>
          ))}
        </div>

        <div className="category">
          <h4>Saved Templates</h4>
          {templates?.map((template) => (
            <div key={template.id} className="template-card">
              <h5>{template.name}</h5>
              <p>{template.description}</p>
              <button onClick={() => onSelectTemplate(JSON.parse(template.default_content))}>
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

**Block-based content transforms your platform from a simple text editor into a sophisticated content creation system that enables rich, interactive learning experiences.** By implementing a flexible block architecture, you provide content creators with powerful tools while maintaining the structure needed for AI assistance, analytics, and multi-platform distribution.