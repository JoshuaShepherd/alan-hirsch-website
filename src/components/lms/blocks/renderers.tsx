import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  TextRichBlock, 
  QuoteBlock, 
  ImageBlock, 
  VideoBlock, 
  CalloutBlock, 
  DownloadBlock, 
  QuizMCQBlock, 
  QuizTFBlock, 
  CTABlock,
  ROICalculatorBlock,
  Block 
} from '@/lib/lms/blocks/schemas'
import { 
  MessageSquare, 
  AlertTriangle, 
  Lightbulb, 
  Book,
  Download,
  ExternalLink,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { useState } from 'react'
import { ROICalculatorBlockRenderer as ROICalculatorRenderer } from './ROICalculatorBlockRenderer'

// Text Rich Block Renderer
export function TextRichBlockRenderer({ block }: { block: TextRichBlock }) {
  // In a real implementation, this would render Tiptap content
  // For now, we'll show a placeholder
  return (
    <div className="prose prose-gray max-w-none">
      <div className="text-muted-foreground italic">
        Rich text content would be rendered here using Tiptap
      </div>
    </div>
  )
}

// Quote Block Renderer
export function QuoteBlockRenderer({ block }: { block: QuoteBlock }) {
  return (
    <blockquote className="border-l-4 border-lms-brand bg-lms-brand/5 p-4 italic">
      <p className="text-lg">{block.props.text}</p>
      {block.props.cite && (
        <cite className="text-sm text-muted-foreground mt-2 block not-italic">
          — {block.props.cite}
        </cite>
      )}
    </blockquote>
  )
}

// Image Block Renderer
export function ImageBlockRenderer({ block }: { block: ImageBlock }) {
  return (
    <figure className="space-y-2">
      <img
        src={block.props.src}
        alt={block.props.alt}
        className="w-full h-auto rounded-lg"
        width={block.props.width}
        height={block.props.height}
      />
      {block.props.caption && (
        <figcaption className="text-sm text-muted-foreground text-center">
          {block.props.caption}
        </figcaption>
      )}
    </figure>
  )
}

// Video Block Renderer
export function VideoBlockRenderer({ block }: { block: VideoBlock }) {
  const { provider, src, poster, width = 640, height = 360 } = block.props
  
  if (provider === 'youtube') {
    const videoId = src.includes('youtube.com') 
      ? new URL(src).searchParams.get('v')
      : src.includes('youtu.be') 
      ? src.split('/').pop()
      : src
    
    return (
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className="w-full h-full rounded-lg"
          allowFullScreen
          title="YouTube video"
        />
      </div>
    )
  }
  
  if (provider === 'vimeo') {
    const videoId = src.split('/').pop()
    return (
      <div className="aspect-video">
        <iframe
          src={`https://player.vimeo.com/video/${videoId}`}
          className="w-full h-full rounded-lg"
          allowFullScreen
          title="Vimeo video"
        />
      </div>
    )
  }
  
  // File or other providers
  return (
    <video 
      controls 
      className="w-full h-auto rounded-lg"
      poster={poster}
      width={width}
      height={height}
    >
      <source src={src} />
      Your browser does not support the video tag.
    </video>
  )
}

// Callout Block Renderer
export function CalloutBlockRenderer({ block }: { block: CalloutBlock }) {
  const { variant, title, body } = block.props
  
  const variantStyles = {
    note: {
      icon: MessageSquare,
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
    },
    insight: {
      icon: Lightbulb,
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200 dark:border-green-800',
      iconColor: 'text-green-600 dark:text-green-400',
    },
    theology: {
      icon: Book,
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
  }
  
  const style = variantStyles[variant]
  const Icon = style.icon
  
  return (
    <Card className={`${style.bgColor} ${style.borderColor} border-l-4`}>
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <Icon className={`h-5 w-5 mt-0.5 ${style.iconColor} flex-shrink-0`} />
          <div className="flex-1 space-y-2">
            {title && (
              <h4 className="font-semibold text-foreground">{title}</h4>
            )}
            <div className="text-muted-foreground">
              {/* Rich text content would be rendered here */}
              Rich text callout content
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

// Download Block Renderer
export function DownloadBlockRenderer({ block }: { block: DownloadBlock }) {
  return (
    <Card className="border-dashed border-2 hover:border-lms-brand transition-colors">
      <div className="p-4">
        <a 
          href={block.props.href}
          className="flex items-center space-x-3 text-lms-brand hover:text-lms-brand/80"
          download
        >
          <Download className="h-6 w-6" />
          <div className="flex-1">
            <div className="font-semibold">{block.props.label}</div>
            {block.props.size && (
              <div className="text-sm text-muted-foreground">{block.props.size}</div>
            )}
          </div>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </Card>
  )
}

// Quiz Multiple Choice Block Renderer
export function QuizMCQBlockRenderer({ block }: { block: QuizMCQBlock }) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  
  const handleOptionChange = (optionId: string) => {
    setSelectedAnswers(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    )
  }
  
  const handleSubmit = () => {
    setSubmitted(true)
    setShowFeedback(true)
  }
  
  const isCorrect = submitted && 
    selectedAnswers.length === block.props.correctIds.length &&
    selectedAnswers.every(id => block.props.correctIds.includes(id))
  
  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-3">
        <div className="font-semibold">
          {/* Question stem - rich text would be rendered here */}
          Quiz question content
        </div>
        
        <div className="space-y-2">
          {block.props.options.map((option) => {
            const isSelected = selectedAnswers.includes(option.id)
            const isCorrectOption = block.props.correctIds.includes(option.id)
            
            return (
              <label
                key={option.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  submitted
                    ? isCorrectOption
                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20'
                      : isSelected && !isCorrectOption
                      ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20'
                      : 'border-gray-200 dark:border-gray-800'
                    : isSelected
                    ? 'border-lms-brand bg-lms-brand/5'
                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => !submitted && handleOptionChange(option.id)}
                  disabled={submitted}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  isSelected ? 'border-lms-brand bg-lms-brand' : 'border-gray-300'
                }`}>
                  {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="flex-1">{option.text}</span>
                {submitted && isCorrectOption && (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
                {submitted && isSelected && !isCorrectOption && (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
              </label>
            )
          })}
        </div>
      </div>
      
      {!submitted && (
        <Button 
          onClick={handleSubmit}
          disabled={selectedAnswers.length === 0}
          className="bg-lms-brand hover:bg-lms-brand/90"
        >
          Submit Answer
        </Button>
      )}
      
      {showFeedback && (
        <div className={`p-4 rounded-lg ${
          isCorrect 
            ? 'bg-green-50 text-green-800 dark:bg-green-950/20 dark:text-green-400' 
            : 'bg-red-50 text-red-800 dark:bg-red-950/20 dark:text-red-400'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
            <span className="font-semibold">
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
          {block.props.feedback && (
            <div>Feedback content would be rendered here</div>
          )}
        </div>
      )}
    </Card>
  )
}

// Quiz True/False Block Renderer
export function QuizTFBlockRenderer({ block }: { block: QuizTFBlock }) {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  
  const handleSubmit = () => {
    setSubmitted(true)
    setShowFeedback(true)
  }
  
  const isCorrect = submitted && selectedAnswer === block.props.correct
  
  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-4">
        <div className="font-semibold">{block.props.statement}</div>
        
        <div className="flex space-x-4">
          {[true, false].map((value) => (
            <label
              key={value.toString()}
              className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors flex-1 justify-center ${
                submitted
                  ? value === block.props.correct
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20'
                    : selectedAnswer === value && value !== block.props.correct
                    ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20'
                    : 'border-gray-200 dark:border-gray-800'
                  : selectedAnswer === value
                  ? 'border-lms-brand bg-lms-brand/5'
                  : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                checked={selectedAnswer === value}
                onChange={() => !submitted && setSelectedAnswer(value)}
                disabled={submitted}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedAnswer === value ? 'border-lms-brand bg-lms-brand' : 'border-gray-300'
              }`}>
                {selectedAnswer === value && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <span className="font-medium">{value ? 'True' : 'False'}</span>
              {submitted && value === block.props.correct && (
                <CheckCircle className="h-4 w-4 text-green-600 ml-2" />
              )}
            </label>
          ))}
        </div>
      </div>
      
      {!submitted && (
        <Button 
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="bg-lms-brand hover:bg-lms-brand/90"
        >
          Submit Answer
        </Button>
      )}
      
      {showFeedback && (
        <div className={`p-4 rounded-lg ${
          isCorrect 
            ? 'bg-green-50 text-green-800 dark:bg-green-950/20 dark:text-green-400' 
            : 'bg-red-50 text-red-800 dark:bg-red-950/20 dark:text-red-400'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
            <span className="font-semibold">
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
          {block.props.feedback && (
            <div>Feedback content would be rendered here</div>
          )}
        </div>
      )}
    </Card>
  )
}

// CTA Block Renderer
export function CTABlockRenderer({ block }: { block: CTABlock }) {
  const buttonVariantClasses = {
    primary: 'bg-lms-brand hover:bg-lms-brand/90 text-white',
    secondary: 'bg-lms-accent hover:bg-lms-accent/90 text-white',
    outline: 'border-2 border-lms-brand text-lms-brand hover:bg-lms-brand hover:text-white',
  }
  
  return (
    <Card className="bg-gradient-to-r from-lms-brand/5 to-lms-accent/5 border-lms-brand/20">
      <div className="p-8 text-center space-y-4">
        <h3 className="text-2xl font-bold text-foreground">{block.props.headline}</h3>
        {block.props.body && (
          <div className="text-muted-foreground max-w-2xl mx-auto">
            {/* Rich text body would be rendered here */}
            CTA body content
          </div>
        )}
        <div className="pt-2">
          <a href={block.props.button.href}>
            <Button 
              size="lg"
              className={buttonVariantClasses[block.props.button.variant]}
            >
              {block.props.button.label}
            </Button>
          </a>
        </div>
      </div>
    </Card>
  )
}

// Block Registry - maps block types to their renderers
export const BLOCK_RENDERERS = {
  textRich: TextRichBlockRenderer,
  quote: QuoteBlockRenderer,
  image: ImageBlockRenderer,
  video: VideoBlockRenderer,
  callout: CalloutBlockRenderer,
  download: DownloadBlockRenderer,
  quizMCQ: QuizMCQBlockRenderer,
  quizTF: QuizTFBlockRenderer,
  cta: CTABlockRenderer,
} as const

// ROI Calculator Block Renderer
export function ROICalculatorBlockRenderer({ block }: { block: ROICalculatorBlock }) {
  return <ROICalculatorRenderer block={block} />
}

// Main Block Renderer Component
export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'textRich':
      return <TextRichBlockRenderer block={block} />
    case 'quote':
      return <QuoteBlockRenderer block={block} />
    case 'image':
      return <ImageBlockRenderer block={block} />
    case 'video':
      return <VideoBlockRenderer block={block} />
    case 'callout':
      return <CalloutBlockRenderer block={block} />
    case 'download':
      return <DownloadBlockRenderer block={block} />
    case 'quizMCQ':
      return <QuizMCQBlockRenderer block={block} />
    case 'quizTF':
      return <QuizTFBlockRenderer block={block} />
    case 'cta':
      return <CTABlockRenderer block={block} />
    case 'roiCalculator':
      return <ROICalculatorBlockRenderer block={block} />
    default:
      return (
        <div className="p-4 border-2 border-dashed border-red-300 bg-red-50 dark:bg-red-950/20 rounded-lg">
          <p className="text-red-600 dark:text-red-400">
            Unknown block type: {(block as { type: string }).type}
          </p>
        </div>
      )
  }
}
