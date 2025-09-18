import { z } from 'zod'

// Base block schema
const BaseBlockSchema = z.object({
  id: z.string(),
  type: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

// Rich text content schema for Tiptap
const RichTextSchema = z.object({
  type: z.literal('doc'),
  content: z.array(z.any()).optional(),
})

// Text Rich Block - Uses Tiptap JSON
export const TextRichBlockSchema = BaseBlockSchema.extend({
  type: z.literal('textRich'),
  props: z.object({
    content: RichTextSchema,
  }),
})

// Quote Block
export const QuoteBlockSchema = BaseBlockSchema.extend({
  type: z.literal('quote'),
  props: z.object({
    text: z.string().min(1, 'Quote text is required'),
    cite: z.string().optional(),
  }),
})

// Image Block
export const ImageBlockSchema = BaseBlockSchema.extend({
  type: z.literal('image'),
  props: z.object({
    src: z.string().url('Must be a valid URL'),
    alt: z.string().min(1, 'Alt text is required for accessibility'),
    caption: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  }),
})

// Video Block
export const VideoBlockSchema = BaseBlockSchema.extend({
  type: z.literal('video'),
  props: z.object({
    provider: z.enum(['mux', 'youtube', 'vimeo', 'file']),
    src: z.string().min(1, 'Video source is required'),
    poster: z.string().url().optional(),
    captions: z.array(z.object({
      lang: z.string(),
      src: z.string().url(),
      label: z.string(),
    })).optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  }),
})

// Callout Block
export const CalloutBlockSchema = BaseBlockSchema.extend({
  type: z.literal('callout'),
  props: z.object({
    variant: z.enum(['note', 'warning', 'insight', 'theology']),
    title: z.string().optional(),
    body: RichTextSchema,
  }),
})

// Download Block
export const DownloadBlockSchema = BaseBlockSchema.extend({
  type: z.literal('download'),
  props: z.object({
    href: z.string().url('Must be a valid URL'),
    label: z.string().min(1, 'Download label is required'),
    size: z.string().optional(),
    type: z.string().optional(),
  }),
})

// Quiz Multiple Choice Question Block
export const QuizMCQBlockSchema = BaseBlockSchema.extend({
  type: z.literal('quizMCQ'),
  props: z.object({
    stem: RichTextSchema,
    options: z.array(z.object({
      id: z.string(),
      text: z.string().min(1, 'Option text is required'),
    })).min(2, 'At least 2 options required'),
    correctIds: z.array(z.string()).min(1, 'At least one correct answer required'),
    shuffle: z.boolean().default(false),
    feedback: RichTextSchema.optional(),
    points: z.number().default(1),
  }),
})

// Quiz True/False Block
export const QuizTFBlockSchema = BaseBlockSchema.extend({
  type: z.literal('quizTF'),
  props: z.object({
    statement: z.string().min(1, 'Statement is required'),
    correct: z.boolean(),
    feedback: RichTextSchema.optional(),
    points: z.number().default(1),
  }),
})

// Call to Action Block
export const CTABlockSchema = BaseBlockSchema.extend({
  type: z.literal('cta'),
  props: z.object({
    headline: z.string().min(1, 'Headline is required'),
    body: RichTextSchema.optional(),
    button: z.object({
      label: z.string().min(1, 'Button label is required'),
      href: z.string().url('Must be a valid URL'),
      variant: z.enum(['primary', 'secondary', 'outline']).default('primary'),
    }),
  }),
})

// ROI Calculator Block
export const ROICalculatorBlockSchema = BaseBlockSchema.extend({
  type: z.literal('roiCalculator'),
  props: z.object({
    title: z.string().default('Publishing ROI Calculator'),
    description: z.string().default('See how different publishing models compare in reaching your subscriber goals'),
    defaultTargetSubscribers: z.number().default(1000),
    defaultMonthlyPrice: z.number().default(10),
    defaultEstimatedVisitors: z.number().default(50000),
  }),
})

// Union of all block schemas
export const BlockSchema = z.discriminatedUnion('type', [
  TextRichBlockSchema,
  QuoteBlockSchema,
  ImageBlockSchema,
  VideoBlockSchema,
  CalloutBlockSchema,
  DownloadBlockSchema,
  QuizMCQBlockSchema,
  QuizTFBlockSchema,
  CTABlockSchema,
  ROICalculatorBlockSchema,
])

// Array of blocks schema
export const BlocksArraySchema = z.array(BlockSchema)

// TypeScript types
export type BaseBlock = z.infer<typeof BaseBlockSchema>
export type RichText = z.infer<typeof RichTextSchema>
export type TextRichBlock = z.infer<typeof TextRichBlockSchema>
export type QuoteBlock = z.infer<typeof QuoteBlockSchema>
export type ImageBlock = z.infer<typeof ImageBlockSchema>
export type VideoBlock = z.infer<typeof VideoBlockSchema>
export type CalloutBlock = z.infer<typeof CalloutBlockSchema>
export type DownloadBlock = z.infer<typeof DownloadBlockSchema>
export type QuizMCQBlock = z.infer<typeof QuizMCQBlockSchema>
export type QuizTFBlock = z.infer<typeof QuizTFBlockSchema>
export type CTABlock = z.infer<typeof CTABlockSchema>
export type ROICalculatorBlock = z.infer<typeof ROICalculatorBlockSchema>

export type Block = z.infer<typeof BlockSchema>
export type BlocksArray = z.infer<typeof BlocksArraySchema>

// Block type enumeration
export const BLOCK_TYPES = {
  TEXT_RICH: 'textRich' as const,
  QUOTE: 'quote' as const,
  IMAGE: 'image' as const,
  VIDEO: 'video' as const,
  CALLOUT: 'callout' as const,
  DOWNLOAD: 'download' as const,
  QUIZ_MCQ: 'quizMCQ' as const,
  QUIZ_TF: 'quizTF' as const,
  CTA: 'cta' as const,
  ROI_CALCULATOR: 'roiCalculator' as const,
} as const

// Block metadata for editor palette
export const BLOCK_METADATA = {
  [BLOCK_TYPES.TEXT_RICH]: {
    name: 'Rich Text',
    description: 'Formatted text with rich editing capabilities',
    icon: 'Type',
    category: 'content',
  },
  [BLOCK_TYPES.QUOTE]: {
    name: 'Quote',
    description: 'Highlighted quote with optional citation',
    icon: 'Quote',
    category: 'content',
  },
  [BLOCK_TYPES.IMAGE]: {
    name: 'Image',
    description: 'Image with caption and alt text',
    icon: 'Image',
    category: 'media',
  },
  [BLOCK_TYPES.VIDEO]: {
    name: 'Video',
    description: 'Video from various providers',
    icon: 'Video',
    category: 'media',
  },
  [BLOCK_TYPES.CALLOUT]: {
    name: 'Callout',
    description: 'Highlighted content box with variant styles',
    icon: 'MessageSquare',
    category: 'content',
  },
  [BLOCK_TYPES.DOWNLOAD]: {
    name: 'Download',
    description: 'File download link with metadata',
    icon: 'Download',
    category: 'interactive',
  },
  [BLOCK_TYPES.QUIZ_MCQ]: {
    name: 'Multiple Choice Quiz',
    description: 'Multiple choice question with feedback',
    icon: 'CheckSquare',
    category: 'assessment',
  },
  [BLOCK_TYPES.QUIZ_TF]: {
    name: 'True/False Quiz',
    description: 'True or false question with feedback',
    icon: 'ToggleLeft',
    category: 'assessment',
  },
  [BLOCK_TYPES.CTA]: {
    name: 'Call to Action',
    description: 'Call to action with button',
    icon: 'ExternalLink',
    category: 'interactive',
  },
} as const

// Helper function to create a new block with default values
export function createBlock(type: Block['type'], overrides: Partial<Block['props']> = {}): Block {
  const id = `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const timestamp = new Date().toISOString()

  switch (type) {
    case BLOCK_TYPES.TEXT_RICH:
      return {
        id,
        type: BLOCK_TYPES.TEXT_RICH,
        createdAt: timestamp,
        updatedAt: timestamp,
        props: {
          content: { type: 'doc' as const, content: [] },
          ...overrides,
        },
      } as TextRichBlock

    case BLOCK_TYPES.QUOTE:
      return {
        id,
        type: BLOCK_TYPES.QUOTE,
        createdAt: timestamp,
        updatedAt: timestamp,
        props: {
          text: '',
          cite: '',
          ...overrides,
        },
      } as QuoteBlock

    case BLOCK_TYPES.IMAGE:
      return {
        id,
        type: BLOCK_TYPES.IMAGE,
        createdAt: timestamp,
        updatedAt: timestamp,
        props: {
          src: '',
          alt: '',
          caption: '',
          ...overrides,
        },
      } as ImageBlock

    case BLOCK_TYPES.VIDEO:
      return {
        id,
        type: BLOCK_TYPES.VIDEO,
        createdAt: timestamp,
        updatedAt: timestamp,
        props: {
          provider: 'youtube' as const,
          src: '',
          poster: '',
          captions: [],
          ...overrides,
        },
      } as VideoBlock

    case BLOCK_TYPES.CALLOUT:
      return {
        id,
        type: BLOCK_TYPES.CALLOUT,
        createdAt: timestamp,
        updatedAt: timestamp,
        props: {
          variant: 'note' as const,
          title: '',
          body: { type: 'doc' as const, content: [] },
          ...overrides,
        },
      } as CalloutBlock

    case BLOCK_TYPES.DOWNLOAD:
      return {
        id,
        type: BLOCK_TYPES.DOWNLOAD,
        createdAt: timestamp,
        updatedAt: timestamp,
        props: {
          href: '',
          label: '',
          size: '',
          type: '',
          ...overrides,
        },
      } as DownloadBlock

    case BLOCK_TYPES.QUIZ_MCQ:
      return {
        id,
        type: BLOCK_TYPES.QUIZ_MCQ,
        createdAt: timestamp,
        updatedAt: timestamp,
        props: {
          stem: { type: 'doc' as const, content: [] },
          options: [
            { id: 'option_1', text: '' },
            { id: 'option_2', text: '' },
          ],
          correctIds: [],
          shuffle: false,
          points: 1,
          ...overrides,
        },
      } as QuizMCQBlock

    case BLOCK_TYPES.QUIZ_TF:
      return {
        id,
        type: BLOCK_TYPES.QUIZ_TF,
        createdAt: timestamp,
        updatedAt: timestamp,
        props: {
          statement: '',
          correct: true,
          points: 1,
          ...overrides,
        },
      } as QuizTFBlock

    case BLOCK_TYPES.CTA:
      return {
        id,
        type: BLOCK_TYPES.CTA,
        createdAt: timestamp,
        updatedAt: timestamp,
        props: {
          headline: '',
          button: {
            label: '',
            href: '',
            variant: 'primary' as const,
          },
          ...overrides,
        },
      } as CTABlock

    case BLOCK_TYPES.ROI_CALCULATOR:
      return {
        id,
        type: BLOCK_TYPES.ROI_CALCULATOR,
        createdAt: timestamp,
        updatedAt: timestamp,
        props: {
          title: 'Publishing ROI Calculator',
          description: 'See how different publishing models compare in reaching your subscriber goals',
          defaultTargetSubscribers: 1000,
          defaultMonthlyPrice: 10,
          defaultEstimatedVisitors: 50000,
          ...overrides,
        },
      } as ROICalculatorBlock

    default:
      throw new Error(`Unknown block type: ${type}`)
  }
}
