'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Send, Loader2, BookOpen, Users, Star, ArrowRight, MessageCircle, Mic, MicOff, Bot, User, Sparkles, Target, Search, Calendar, Play } from 'lucide-react'

// AI Agent Types (following vendor patterns)
interface AgentMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  tools?: ToolCall[]
  status?: 'sending' | 'complete' | 'error'
}

interface ToolCall {
  id: string
  name: string
  parameters: Record<string, any>
  result?: any
  needsApproval?: boolean
  approved?: boolean
  action?: () => void
}

interface AgentState {
  isActive: boolean
  isListening: boolean
  isProcessing: boolean
  currentTopic?: string
  userProfile?: {
    interests: string[]
    readingLevel: string
    preferredContent: string[]
  }
}

// Alan Hirsch AI Agent Component
function AlanHirschAgent() {
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm Alan's AI assistant. I'm here to help you explore missional church renewal, discover your APEST gifts, and find the perfect resources for your leadership journey. What brings you here today?",
      timestamp: new Date(),
      status: 'complete'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [agentState, setAgentState] = useState<AgentState>({
    isActive: false,
    isListening: false,
    isProcessing: false
  })
  const [suggestions] = useState([
    "Help me understand the APEST framework",
    "I'm starting a church plant - where should I begin?",
    "What books would you recommend for my leadership team?",
    "How can I assess my missional effectiveness?"
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Real AI Agent Response using API
  const generateAgentResponse = async (userMessage: string): Promise<AgentMessage> => {
    try {
      const response = await fetch('/api/ai-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            ...messages,
            {
              id: Date.now().toString(),
              role: 'user' as const,
              content: userMessage,
              timestamp: new Date(),
              status: 'complete' as const
            }
          ]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get agent response')
      }

      const data = await response.json()
      const assistantMessage = data.history[data.history.length - 1]
      
      return {
        id: assistantMessage.id,
        role: 'assistant' as const,
        content: assistantMessage.content,
        timestamp: new Date(assistantMessage.timestamp),
        tools: assistantMessage.tools,
        status: 'complete' as const
      }
    } catch (error) {
      console.error('Agent response error:', error)
      return {
        id: Date.now().toString(),
        role: 'assistant' as const,
        content: "I apologize, but I'm having trouble processing your request right now. Please try again or explore our resources directly through the navigation menu.",
        timestamp: new Date(),
        status: 'error' as const
      }
    }
  }

  const handleToolAction = (tool: ToolCall) => {
    // Handle different tool actions
    switch (tool.id) {
      case 'apest-assessment':
        window.open('/missional-assessment', '_blank')
        break
      case 'book-recommendations':
        window.open('/books', '_blank')
        break
      case 'church-plant-roadmap':
        handleSendMessage("I'd like help creating a church planting roadmap for my specific context")
        break
      case 'speaking-inquiry':
        window.open('/contact', '_blank')
        break
      default:
        // Execute the tool's action if it exists
        if (tool.action && typeof tool.action === 'function') {
          tool.action()
        }
        break
    }
  }

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputValue.trim()
    if (!messageToSend) return

    // Add user message
    const userMessage: AgentMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageToSend,
      timestamp: new Date(),
      status: 'complete'
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setAgentState(prev => ({ ...prev, isProcessing: true }))

    // Add processing indicator
    const processingMessage: AgentMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      status: 'sending'
    }
    setMessages(prev => [...prev, processingMessage])

    // Simulate processing delay and generate response
    setTimeout(async () => {
      const response = await generateAgentResponse(messageToSend)
      setMessages(prev => prev.slice(0, -1).concat(response))
      setAgentState(prev => ({ ...prev, isProcessing: false }))
    }, 1500)
  }

  const toggleAgent = () => {
    setAgentState(prev => ({ ...prev, isActive: !prev.isActive }))
  }

  return (
    <>
      {/* AI Agent Toggle Button */}
      <button
        onClick={toggleAgent}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
          agentState.isActive 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-card border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
        }`}
      >
        {agentState.isProcessing ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <Bot className="h-6 w-6" />
        )}
        {!agentState.isActive && (
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
        )}
      </button>

      {/* AI Agent Chat Interface */}
      {agentState.isActive && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-card border border-border rounded-lg shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground text-sm">Alan's AI Assistant</h3>
                <p className="text-xs text-card-foreground/60">Missional Leadership Guide</p>
              </div>
            </div>
            <button 
              onClick={toggleAgent}
              className="text-card-foreground/60 hover:text-card-foreground"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-3 w-3 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-card-foreground'
                  }`}
                >
                  {message.status === 'sending' ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span className="text-xs">Thinking...</span>
                    </div>
                  ) : (
                    <>
                      {message.content}
                      {message.tools && message.tools.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.tools.map((tool, index) => (
                            <button
                              key={index}
                              onClick={() => handleToolAction(tool)}
                              className="block w-full text-left text-xs px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                            >
                              {tool.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length === 1 && (
            <div className="p-3 border-t border-border">
              <p className="text-xs text-card-foreground/60 mb-2">Try asking:</p>
              <div className="grid grid-cols-1 gap-1">
                {suggestions.slice(0, 2).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(suggestion)}
                    className="text-xs text-left p-2 bg-muted/50 rounded hover:bg-muted transition-colors"
                  >
                    "{suggestion}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about APEST, church planting, books..."
                className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={agentState.isProcessing}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || agentState.isProcessing}
                className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Main Alternative Homepage Component
export default function AlternativeHomepage() {
  return (
    <div className="bg-page">
      {/* AI-Enhanced Hero Section */}
      <section className="section-padding-lg bg-gradient-to-br from-section via-page to-section/50">
        <div className="max-w-container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="space-y-8">
              {/* AI Indicator */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                AI-Powered Learning Experience
              </div>

              <div className="space-y-6">
                <h1 className="font-display text-display-lg leading-tight text-foreground">
                  Meet Your Personal{' '}
                  <span className="text-primary">Missional Guide</span>
                </h1>
                
                <p className="text-lg leading-relaxed text-foreground/80">
                  I'm Alan's AI assistant, trained on 30+ years of missional church wisdom. 
                  Whether you're discovering your APEST gifts, starting a church plant, or leading 
                  transformation, I'm here to guide your journey with personalized insights.
                </p>

                {/* AI Capabilities */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: Target, text: "APEST Gift Discovery", color: "blue" },
                    { icon: BookOpen, text: "Personalized Book Recommendations", color: "green" },
                    { icon: Search, text: "Instant Content Search", color: "purple" },
                    { icon: Users, text: "Community Connections", color: "orange" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border/50">
                      <div className={`w-8 h-8 bg-${item.color}-500/10 rounded-lg flex items-center justify-center`}>
                        <item.icon className={`h-4 w-4 text-${item.color}-600`} />
                      </div>
                      <span className="text-sm font-medium text-card-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="btn-primary inline-flex items-center gap-2 justify-center group">
                    <MessageCircle className="h-4 w-4" />
                    Start AI Conversation
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </button>
                  <Link 
                    href="/books" 
                    className="btn-outline inline-flex items-center gap-2 justify-center"
                  >
                    <BookOpen className="h-4 w-4" />
                    Browse Traditional Way
                  </Link>
                </div>
              </div>

              {/* Live Activity Indicator */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {['AH', 'SM', 'MC', 'ER'].map((initials, i) => (
                      <div key={i} className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-background">
                        {initials}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-foreground/70">127 active conversations today</span>
                </div>
              </div>
            </div>

            {/* AI Interface Preview */}
            <div className="relative">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl">
                {/* Mock Chat Interface */}
                <div className="space-y-4">
                  {/* AI Message */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 bg-muted px-4 py-3 rounded-lg">
                      <p className="text-sm text-card-foreground">
                        Hello! I can help you discover your APEST gifts, find the right books for your context, 
                        and connect you with the perfect resources. What's your biggest leadership challenge right now?
                      </p>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex gap-3 justify-end">
                    <div className="bg-primary px-4 py-3 rounded-lg max-w-xs">
                      <p className="text-sm text-primary-foreground">
                        I'm starting a church plant and feeling overwhelmed. Where do I begin?
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  {/* AI Response with Actions */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 bg-muted px-4 py-3 rounded-lg">
                      <p className="text-sm text-card-foreground mb-3">
                        Church planting is exciting! Let me help you with the foundational elements from "The Forgotten Ways." 
                        I'll create a personalized roadmap based on your context.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                          📚 Church Plant Toolkit
                        </button>
                        <button className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                          🎯 APEST Assessment
                        </button>
                        <button className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                          👥 Connect with Mentors
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask me anything about missional church..."
                      className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md"
                      disabled
                    />
                    <button className="px-3 py-2 bg-primary text-primary-foreground rounded-md">
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 text-sm bg-primary text-primary-foreground px-3 py-1 rounded-full font-medium shadow-lg">
                AI-Powered
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Enhanced Content Discovery */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-md mb-4 text-foreground">
              Smart Content Discovery
            </h2>
            <p className="text-lg max-w-content mx-auto leading-relaxed text-foreground/80">
              Let AI help you navigate 30+ years of missional wisdom with personalized recommendations 
              and intelligent search.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* AI Book Recommendations */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-card-foreground">Smart Reading Path</h3>
              <p className="text-card-foreground/80 mb-4">
                AI analyzes your role, challenges, and interests to recommend the perfect books in the optimal sequence.
              </p>
              <button className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1">
                Get My Reading Plan <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* Contextual Search */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-card-foreground">Contextual Search</h3>
              <p className="text-card-foreground/80 mb-4">
                Ask questions in natural language and get precise answers from Alan's entire library with source citations.
              </p>
              <button className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1">
                Try AI Search <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* Personalized Assessments */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-card-foreground">Adaptive Assessments</h3>
              <p className="text-card-foreground/80 mb-4">
                AI-guided APEST and missional assessments that adapt based on your responses for deeper insights.
              </p>
              <button className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1">
                Start Assessment <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional Content Access */}
      <section className="section-padding bg-section">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-md mb-4 text-foreground">
              Or Browse the Traditional Way
            </h2>
            <p className="text-lg text-foreground/80">
              Prefer to explore on your own? Access all content directly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Complete Book Library", icon: BookOpen, href: "/books", count: "15 Books" },
              { title: "Community Discussions", icon: Users, href: "/community", count: "3,200+ Members" },
              { title: "Assessment Tools", icon: Target, href: "/missional-assessment", count: "5 Assessments" },
              { title: "Partner Network", icon: Star, href: "/toolkit", count: "6 Organizations" }
            ].map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-card-foreground/60">{item.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Integration */}
      <AlanHirschAgent />
    </div>
  )
}
