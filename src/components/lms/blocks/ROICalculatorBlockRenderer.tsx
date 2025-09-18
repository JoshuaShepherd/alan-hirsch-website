'use client'

import { ROICalculatorBlock } from '@/lib/lms/blocks/schemas'
import { ROICalculatorTool } from './ROICalculatorTool'

interface ROICalculatorBlockRendererProps {
  block: ROICalculatorBlock
  isPreview?: boolean
}

export function ROICalculatorBlockRenderer({ 
  block, 
  isPreview = false 
}: ROICalculatorBlockRendererProps) {
  const { title, description, defaultTargetSubscribers, defaultMonthlyPrice, defaultEstimatedVisitors } = block.props

  // In preview mode, show a simplified version
  if (isPreview) {
    return (
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
          <div className="text-sm text-muted-foreground">
            Interactive ROI Calculator - Click to interact in lesson
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-8">
      <ROICalculatorTool 
        initialTargetSubscribers={defaultTargetSubscribers}
        initialMonthlyPrice={defaultMonthlyPrice}
        initialEstimatedVisitors={defaultEstimatedVisitors}
        title={title}
        description={description}
      />
    </div>
  )
}
