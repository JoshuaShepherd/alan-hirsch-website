// API Route for Alan Hirsch AI Agent
// Following patterns from vendor/openai-agents-js-main/examples/nextjs/

import { NextRequest, NextResponse } from 'next/server'
// import { alanHirschAgent } from '@/lib/agents/alan-hirsch-agent'

interface AgentMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  tools?: any[]
  status?: 'sending' | 'complete' | 'error'
}

interface AgentRequest {
  messages: AgentMessage[]
  conversationId?: string
  decisions?: Record<string, 'approved' | 'rejected'>
}

export async function POST(request: NextRequest) {
  try {
    const body: AgentRequest = await request.json()
    const { messages, conversationId, decisions } = body

    // Get the last user message
    const lastMessage = messages.filter(m => m.role === 'user').pop()
    if (!lastMessage) {
      return NextResponse.json({ error: 'No user message found' }, { status: 400 })
    }

    // Mock AI Agent Response (would integrate with vendor SDK)
    const response = await generateAgentResponse(lastMessage.content)

    // Create conversation history
    const updatedHistory = [
      ...messages.slice(0, -1), // Remove the placeholder message
      {
        id: Date.now().toString(),
        role: 'assistant' as const,
        content: response.content,
        timestamp: new Date(),
        tools: response.tools,
        status: 'complete' as const
      }
    ]

    return NextResponse.json({
      history: updatedHistory,
      conversationId: conversationId || `conv-${Date.now()}`,
      approvals: response.approvals || []
    })

  } catch (error) {
    console.error('Agent API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Mock AI Response Generation (would use vendor SDK)
async function generateAgentResponse(userMessage: string) {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  const message = userMessage.toLowerCase()
  let content = ''
  let tools: any[] = []
  let approvals: any[] = []

  // Pattern matching for different topics (would be replaced with proper LLM)
  if (message.includes('apest')) {
    content = `The APEST framework represents the five-fold ministry gifts from Ephesians 4:11-13. Each gift - Apostle, Prophet, Evangelist, Shepherd, and Teacher - serves a unique function in building mature Christian communities.

Would you like me to help you discover your primary APEST gifts through our assessment tool? It's designed to give you personalized insights based on Alan's research.`
    
    tools = [
      {
        id: 'apest-assessment',
        name: 'Start APEST Assessment',
        description: 'Begin personalized gift discovery assessment',
        action: () => console.log('Would start APEST assessment')
      }
    ]
  } 
  else if (message.includes('church plant') || message.includes('starting')) {
    content = `Church planting is both exciting and challenging! Based on Alan's work in "The Forgotten Ways," I recommend starting with understanding the six elements of mDNA (missional DNA):

1. Jesus is Lord - Christological foundation
2. Disciple Making - Reproducing disciples
3. Missional-Incarnational Impulse - Sending and contextualizing
4. Apostolic Environment - Pioneering and multiplying
5. Organic Systems - Simple, reproducible structures  
6. Communitas - Shared mission and adventure

Would you like me to create a personalized church planting roadmap for your context?`

    tools = [
      {
        id: 'church-plant-roadmap',
        name: 'Create Planting Roadmap',
        description: 'Generate personalized church planting plan',
        action: () => console.log('Would create church planting roadmap')
      },
      {
        id: 'mdna-assessment',
        name: 'Assess Current mDNA',
        description: 'Evaluate your current missional DNA',
        action: () => console.log('Would start mDNA assessment')
      }
    ]
  }
  else if (message.includes('book') || message.includes('read')) {
    content = `I'd love to recommend books tailored to your specific context! Alan has written 15+ books covering different aspects of missional living. 

For someone just starting out, I typically recommend:
- "The Forgotten Ways" for foundational understanding
- "ReJesus" for understanding Jesus' revolutionary nature
- "5Q" for APEST framework deep-dive

What's your current role and biggest leadership challenge? This will help me suggest the perfect reading sequence.`

    tools = [
      {
        id: 'book-recommendations',
        name: 'Get Personalized Recommendations',
        description: 'Receive curated book suggestions',
        action: () => console.log('Would generate book recommendations')
      }
    ]
  }
  else if (message.includes('speak') || message.includes('consult')) {
    content = `I can help you explore options for having Alan speak at your event or provide consultation for your organization. 

Alan's speaking topics include:
- Missional Church Transformation
- APEST Leadership Development  
- Movement Multiplication Principles
- Organizational Culture Change

Let me gather some details about your needs and connect you with the right resources.`

    tools = [
      {
        id: 'speaking-inquiry',
        name: 'Submit Speaking Request',
        description: 'Request speaking engagement or consultation',
        needsApproval: true,
        action: () => console.log('Would submit speaking request')
      }
    ]

    // This would need approval
    approvals = [
      {
        id: 'speaking-inquiry',
        toolName: 'Submit Speaking Request',
        parameters: {
          requestType: 'speaking',
          organization: 'User Organization',
          topic: 'Missional Leadership'
        },
        description: 'User is requesting information about speaking engagements'
      }
    ]
  }
  else {
    content = `I'm here to help you explore missional church renewal and leadership development. I can assist you with:

• **APEST Gift Discovery** - Find your unique ministry gifts
• **Book Recommendations** - Personalized reading plans  
• **Church Planting Guidance** - mDNA and multiplication principles
• **Community Connections** - Link you with like-minded leaders
• **Speaking & Consultation** - Connect with Alan for events

What area interests you most? Or feel free to ask me any specific question about missional leadership!`

    tools = [
      {
        id: 'apest-quick-start',
        name: 'Discover Your Gifts',
        description: 'Quick APEST assessment',
        action: () => console.log('Quick APEST start')
      },
      {
        id: 'book-finder',
        name: 'Find Perfect Book',
        description: 'Get reading recommendations',
        action: () => console.log('Book finder')
      }
    ]
  }

  return {
    content,
    tools,
    approvals
  }
}
