import { BlockRenderer } from './blocks/renderers'
import { Block } from '@/lib/lms/blocks/schemas'

interface LessonRendererProps {
  blocks: Block[]
  className?: string
}

export function LessonRenderer({ blocks, className = '' }: LessonRendererProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center py-12 text-muted-foreground">
          <p>This lesson doesn't have any content yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {blocks.map((block) => (
        <div key={block.id} className="w-full">
          <BlockRenderer block={block} />
        </div>
      ))}
    </div>
  )
}
